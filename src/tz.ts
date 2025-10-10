import { isString } from "@dwtechs/checkard";

// check for env variables
const { TZ } = process?.env ?? null;

const dTimeZone = 'Europe/Paris';

// Regex to validate IANA timezone format (e.g., Europe/Paris, America/New_York, Asia/Tokyo)
// Format: Region/City or Region/SubRegion/City
const timeZoneRegex = /^[A-Z][a-z]+\/[A-Z][a-z_]+(?:\/[A-Z][a-z_]+)?$/;

function isTimeZone(v: string): boolean {
  return isString(v, "!0") && timeZoneRegex.test(v);
}

let timeZone: string = isTimeZone(TZ) ? TZ : dTimeZone;

function getTimeZone(): string {
  return timeZone;
}

function setTimeZone(tz: string): string {
  if (isTimeZone(tz))
    timeZone = tz;
  return timeZone;
}

export { getTimeZone, setTimeZone };