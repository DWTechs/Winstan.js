// Module-level state

const dTimeZone = 'Europe/Paris';
const dLocale = 'fr-FR';
const dService = undefined;
const dColorize = true;

// check for env variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? null;


function setDateFormat(timeZone: string | undefined, locale: string | undefined): string { 
  const tz = (isString(timeZone) && isStringOfLength(timeZone, 2, 999)) ? timeZone : "europe/paris";
  const l = (isString(locale) && isStringOfLength(locale, 5, 5)) ? locale : "fr-FR";  
  return new Date().toLocaleString(l, { timeZone: tz });
}

function setService(service: string | undefined): string {
  return (isString(service) && isStringOfLength(service, 1, 99)) ? service : "";
}


init(TZ, LOCALE, SERVICE_NAME, getLevel());

