import type { Levels } from "./types";
import winston from "winston";
import { isString } from "@dwtechs/checkard";
import { 
  setDateFormat,
  setService,
  setTransports,
  setFormat,
  getFormat
} from "./format.js";
import { getLevels, getLevel, setLevel } from "./level";
// import { getColors } from "./color";

let logger: winston.Logger;


/**
 * Initializes the logging configuration.
 *
 * @param timeZone - The time zone to be used for logging timestamps. If undefined, the default time zone will be used.
 * @param locale - The locale to be used for formatting dates. If undefined, the default locale will be used.
 * @param service - The name of the service for which the logging is being configured. If undefined, a default service name will be used.
 * @param level - The logging level to be set. This determines the severity of logs that will be captured.
 * 
 * @returns void
 */
function init(
  timeZone: string | undefined,
  locale: string | undefined,
  service: string | undefined,
  level: Levels
): void {
  const dateFormat = setDateFormat(timeZone, locale);
  const s = setService(service);
  setLevel(level);
  setFormat(dateFormat, s);
  logger = winston.createLogger({ 
    level: getLevel(),
    silent: false,
    format: getFormat(),
    levels: getLevels(),
    transports: setTransports()
  });
}

// check for env variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? null;
setLevel((NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug");
init(TZ, LOCALE, SERVICE_NAME, getLevel());

// winston.addColors(getColors());

function print(
  lvl: Levels,
  msg: string,
  info?: Record<string, string | number | string[] | number[]>
): void {
  if (!isString(msg, "!0"))
    return;
  logger[lvl](msg, info);
}

const log = {
  error: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('error', msg, info);
  },
  warn: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('warn', msg, info);
  },
  info: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('info', msg, info);
  },
  debug: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('debug', msg, info);
  }
};

export {
  init, 
  log,
}

// const errors = [
// 	{ code: 400, level: "warn", name: "Bad request" },
// 	{ code: 401, level: "warn", name: "Unauthorized" },
// 	{ code: 404, level: "warn", name: "Not found" },
// 	{ code: 500, level: "error", name: "Internal" },
// 	{ code: 503, level: "error", name: "Unavailable" },
// ];