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

export function getAlternatePath(url: URL): string {
  const currentLang = getLangFromUrl(url);
  const alternateLang = getAlternateLanguage(currentLang);

  const pathParts = url.pathname.split('/').filter(Boolean);
  if (pathParts[0] in languages) {
    pathParts[0] = alternateLang;
  } else {
    pathParts.unshift(alternateLang);
  }

  return '/' + pathParts.join('/');
}
