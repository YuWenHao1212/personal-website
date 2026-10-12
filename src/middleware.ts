import { defineMiddleware } from 'astro:middleware';
import { defaultLang, languages } from './i18n/ui';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip for static assets, API routes, admin and partner pages
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/partner') ||
    // The 404 page has no language prefix by design. Without this line the redirect at the bottom
    // turned it into a "Redirecting to /zh-TW/404/" stub at build time, and that address does not
    // exist either, so a visitor on a missing page was sent in a loop and never saw 404.astro.
    pathname === '/404' ||
    pathname === '/404/' ||
    // llms.txt is one file for the whole site (built by pages/llms.txt.ts), so it has no language prefix either.
    pathname === '/llms.txt' ||
    pathname.match(/\.(css|js|svg|png|jpg|jpeg|webp|gif|ico|woff|woff2|ttf|eot)$/)
  ) {
    return next();
  }

  // Check if the path already has a language prefix
  const pathParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];

  if (firstSegment && firstSegment in languages) {
    // Path already has a valid language prefix
    return next();
  }

  // Root path "/" - redirect based on Accept-Language header
  if (pathname === '/') {
    const acceptLanguage = context.request.headers.get('accept-language') || '';

    // Check if browser prefers English
    const prefersEnglish = acceptLanguage
      .toLowerCase()
      .split(',')
      .some(lang => lang.startsWith('en'));

    const targetLang = prefersEnglish ? 'en' : defaultLang;
    return context.redirect(`/${targetLang}/`, 302);
  }

  // Other paths without language prefix - redirect to default language
  return context.redirect(`/${defaultLang}${pathname}`, 302);
});
