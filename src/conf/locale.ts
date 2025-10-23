import { isLocale } from "@dwtechs/checkard";

const { LOCALE } = process?.env ?? null;

const def = 'fr-FR';

let locale: string = isLocale(LOCALE) ? LOCALE : def;

function setLocale(loc: string): string {
  if (isLocale(loc))
    locale = loc;
  return locale;
}

export { locale, setLocale };