import { defineMiddleware } from 'astro:middleware';
import { defaultLang, languages } from './i18n/ui';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip for static assets and API routes
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api') ||
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
