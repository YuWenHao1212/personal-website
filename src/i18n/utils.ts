import { getCollection } from 'astro:content';
import { ui, defaultLang, type Lang, languages } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    const value = ui[lang][key] || ui[defaultLang][key];
    if (typeof value === 'string') {
      // Handle dynamic replacements like {year}
      return value.replace('{year}', new Date().getFullYear().toString());
    }
    return key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Check if path already has a language prefix
  const [firstSegment, ...rest] = cleanPath.split('/');
  if (firstSegment in languages) {
    // Replace existing language prefix
    return `/${lang}/${rest.join('/')}`;
  }

  // Add language prefix
  return `/${lang}/${cleanPath}`;
}

export function getAlternateLanguage(currentLang: Lang): Lang {
  return currentLang === 'zh-TW' ? 'en' : 'zh-TW';
}

/**
 * Synchronous fallback: pure path replacement (current-lang ↔ alternate-lang).
 * Used for non-blog pages, or as fallback when a translation key is missing.
 */
function getAlternatePathByPathReplacement(url: URL): string {
  const currentLang = getLangFromUrl(url);
  const alternateLang = getAlternateLanguage(currentLang);

  const pathParts = url.pathname.split('/').filter(Boolean);
  if (pathParts[0] in languages) {
    pathParts[0] = alternateLang;
  } else {
    pathParts.unshift(alternateLang);
  }

  const path = '/' + pathParts.join('/');

  // Static assets (images, css, js, etc.) should never have trailing slash
  const lastPart = pathParts[pathParts.length - 1] || '';
  const hasExtension = lastPart.includes('.') && !lastPart.startsWith('.');
  if (hasExtension) {
    return path;
  }

  // HTML pages: preserve original trailing slash behavior
  const hasTrailingSlash = url.pathname.endsWith('/');
  return hasTrailingSlash ? path + '/' : path;
}

/**
 * Resolves the alternate-language URL for any page on the site.
 *
 * For blog posts (/{lang}/blog/{slug}/), looks up the translated post by
 * `translationKey` and returns the alternate-language post's actual slug —
 * which can differ from the current slug (e.g. zh-TW personal-panopticon ↔
 * en ai-second-brain). This is required for correct hreflang and language
 * switching when bilingual posts have language-specific slugs.
 *
 * For all other pages, falls back to pure path replacement.
 *
 * Edge cases:
 * - Blog post has no `translationKey`: fallback to path replacement
 * - Blog post has `translationKey` but no translated post exists: fallback to
 *   path replacement (target page may not exist; caller should also check
 *   `hasAlternate` before emitting hreflang)
 */
export async function getAlternatePath(url: URL): Promise<string> {
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Detect blog post URL: /{lang}/blog/{slug}/
  const isBlogPost =
    pathParts.length >= 3 &&
    pathParts[0] in languages &&
    pathParts[1] === 'blog';

  if (!isBlogPost) {
    return getAlternatePathByPathReplacement(url);
  }

  const currentLang = getLangFromUrl(url);
  const alternateLang = getAlternateLanguage(currentLang);
  const currentSlug = pathParts[2];

  try {
    const allPosts = await getCollection('blog');

    // Find the current post by lang + slug
    const currentPost = allPosts.find((post) => {
      if (post.data.lang !== currentLang) return false;
      const postSlug = post.id.split('/').pop();
      return postSlug === currentSlug;
    });

    if (!currentPost?.data.translationKey) {
      return getAlternatePathByPathReplacement(url);
    }

    // Find the translated post by translationKey + alternateLang
    const translatedPost = allPosts.find(
      (post) =>
        post.data.translationKey === currentPost.data.translationKey &&
        post.data.lang === alternateLang
    );

    if (!translatedPost) {
      return getAlternatePathByPathReplacement(url);
    }

    const translatedSlug = translatedPost.id.split('/').pop();
    return `/${alternateLang}/blog/${translatedSlug}/`;
  } catch {
    // If getCollection fails for any reason, fallback gracefully
    return getAlternatePathByPathReplacement(url);
  }
}
