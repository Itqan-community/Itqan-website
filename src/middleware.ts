import { defineMiddleware } from 'astro:middleware';
import { defaultLang } from './i18n/ui';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // If the path doesn't end with a slash, redirect to the version with a slash
  if (!path.endsWith('/')) {
    return context.redirect(`${path}/`);
  }

  // Check if the path starts with a language code
  const langMatch = path.match(/^\/([a-z]{2})\//);
  if (!langMatch) {
    // If no language code is found, redirect to the default language
    return context.redirect(`/${defaultLang}${path}`);
  }

  const lang = langMatch[1];
  if (!['ar', 'en'].includes(lang)) {
    // If the language code is invalid, redirect to the default language
    return context.redirect(`/${defaultLang}${path}`);
  }

  // Continue with the request
  return next();
}); 