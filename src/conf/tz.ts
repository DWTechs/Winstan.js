import { isTimeZone } from "@dwtechs/checkard";

const { TZ } = process?.env ?? null;

const dTimeZone = 'Europe/Paris';

let timeZone: string = isTimeZone(TZ) ? TZ : dTimeZone;

function setTimeZone(tz: string): string {
  if (isTimeZone(tz))
    timeZone = tz;
  return timeZone;
}

export { timeZone, setTimeZone };