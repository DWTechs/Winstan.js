import { isLocale } from "@dwtechs/checkard";

const { LOCALE } = process?.env ?? null;

const def = 'fr-FR';

let locale: string = isLocale(LOCALE) ? LOCALE : def;

/**
 * Sets the locale for date and time formatting in log messages.
 * Used to control the regional format of timestamps in log output.
 * 
 * @param {string} loc - The locale string to set (e.g., 'en-US', 'fr-FR', 'de-DE', 'ja-JP')
 *   - Must be a valid BCP 47 language tag format
 *   - Examples: 'en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'pt-BR', 'ru-RU', 'zh-CN', 'ja-JP'
 *   - Invalid locales are ignored and the current locale remains unchanged
 * 
 * @returns {string} The current locale after the operation.
 *   - If the provided locale is valid, returns the new locale
 *   - If the provided locale is invalid, returns the unchanged current locale
 * 
 * @example
 * // Set to US English format
 * setLocale('en-US');
 * console.log(locale); // 'en-US'
 * // Timestamps will be formatted as: 12/25/2023, 10:30:45 AM
 * 
 * @example
 * // Set to French format
 * setLocale('fr-FR'); 
 * // Timestamps will be formatted as: 25/12/2023 10:30:45
 * 
 * @example
 * // Set to German format
 * setLocale('de-DE');
 * // Timestamps will be formatted as: 25.12.2023, 10:30:45
 * 
 * @example
 * // Invalid locale is ignored
 * const current = locale;
 * setLocale('invalid-locale');
 * console.log(locale === current); // true - unchanged
 * 
 * @example
 * // Japanese format
 * setLocale('ja-JP');
 * // Timestamps will be formatted as: 2023/12/25 10:30:45
 */
function setLocale(loc: string): string {
  if (isLocale(loc))
    locale = loc;
  return locale;
}

export { locale, setLocale };