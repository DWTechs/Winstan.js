import { isString } from "@dwtechs/checkard";

const { LOCALE } = process?.env ?? null;

const def = 'fr-FR';

// Regex to validate locale format (e.g., en-US, fr-FR, ja-JP)
// Format: 2 lowercase letters, hyphen, 2 uppercase letters
const localeRegex = /^[a-z]{2}-[A-Z]{2}$/;
// Extended locale format supporting scripts and variants
const extendedLocaleRegex = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?(-[a-zA-Z0-9]+)*$/;

function isLocale(v: unknown, ext: boolean = false): v is string {
  return (isString(v, "!0") && (ext ? extendedLocaleRegex.test(v) : isString(v, "=", 5) && localeRegex.test(v)));
}

let locale: string = isLocale(LOCALE) ? LOCALE : def;

function setLocale(loc: string): string {
  if (isLocale(loc))
    locale = loc;
  return locale;
}

export { locale, setLocale };