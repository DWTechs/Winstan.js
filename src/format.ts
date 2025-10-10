// src/format.ts
import type { Levels } from "./types";
import { Logger, LoggerOptions } from "./winstan";

let log: Logger;

function setDateFormat(timeZone: string | undefined, locale: string | undefined): string { 
  const tz = (isString(timeZone) && isStringOfLength(timeZone, 2, 999)) ? timeZone : "europe/paris";
  const l = (isString(locale) && isStringOfLength(locale, 5, 5)) ? locale : "fr-FR";  
  return new Date().toLocaleString(l, { timeZone: tz });
}

function setService(service: string | undefined): string {
  return (isString(service) && isStringOfLength(service, 1, 99)) ? service : "";
}

function setTransports(): transport[] {
  return [new winston.transports.Console()];
  // new winston.transports.File({ filename: 'log.json', format: winston.format.json() })
} 


function init(
  timeZone: string | undefined,
  locale: string | undefined,
  service: string | undefined,
  level: Levels
): void {
  const options: LoggerOptions = {
    timeZone,
    locale,
    service,
    level,
    colorize: true // Enable colors by default
  };
  
  log = new Logger(options);
}

// Initialize with environment variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
const defaultLevel: Levels = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

init(TZ, LOCALE, SERVICE_NAME, defaultLevel);

export { init, log };
