// Module-level state
import { locale } from "../conf/locale";
import { timeZone } from "../conf/timezone";

function formatDate(): string {
  const now = new Date();
  const date = now.toLocaleDateString(locale, { timeZone });
  const time = now.toLocaleTimeString(locale, { timeZone });
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  return `${date} ${time}:${ms}`;
}

export { formatDate };
