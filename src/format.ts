// src/format.ts
import type { Levels } from "./types";
import { Logger, LoggerOptions } from "./winstan";

let log: Logger;

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
