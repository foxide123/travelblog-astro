import { defineMiddleware } from "astro:middleware";
import { SupportedLocaleArray, DefaultLocale } from "./utils/localeUtils";

function detectPreferredLocale(acceptLanguageHeader) {
    if (!acceptLanguageHeader) return DefaultLocale;
  
    const accepted = acceptLanguageHeader
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase());
  
    for (const lang of accepted) {
      const base = lang.split('-')[0]; // e.g., "en-US" → "en"
      if (SupportedLocaleArray.includes(base)) return base;
    }
  
    return DefaultLocale;
  }

export const onRequest = defineMiddleware(async (ctx, next) => {
  console.log("middleware loaded")
    const {pathname} = ctx.url;

  const hasLocale = SupportedLocaleArray.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if(!hasLocale){
    const acceptLanguage = ctx.request.headers.get('accept-language');
    const preferredLocale = detectPreferredLocale(acceptLanguage);
    
    //const newPath = `/${DefaultLocale}${pathname}`;
    
    const newPath = new URL(`/${preferredLocale}`, ctx.url);
    const url = new URL(newPath, ctx.url);
    /* return Response.redirect(url, 302); */
    return ctx.redirect(url);
  }
   return next()
})