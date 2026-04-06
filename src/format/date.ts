// Module-level state
import { locale } from "../conf/locale";
import { timeZone } from "../conf/tz";

// Cache Intl.DateTimeFormat instances — only rebuilt when locale or timeZone changes
let cachedLocale: string = '';
let cachedTimeZone: string = '';
let dateFormatter: Intl.DateTimeFormat;
let timeFormatter: Intl.DateTimeFormat;

function getFormatters(): void {
  if (locale !== cachedLocale || timeZone !== cachedTimeZone) {
    cachedLocale = locale;
    cachedTimeZone = timeZone;
    dateFormatter = new Intl.DateTimeFormat(cachedLocale, { timeZone: cachedTimeZone, year: 'numeric', month: 'numeric', day: 'numeric' });
    timeFormatter = new Intl.DateTimeFormat(cachedLocale, { timeZone: cachedTimeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' });
  }
}

function formatDate(): string {
  getFormatters();
  const now = new Date();
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  return `time=${dateFormatter.format(now)} ${timeFormatter.format(now)}:${ms}`;
}

export { formatDate };
