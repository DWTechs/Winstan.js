import type { Levels } from "./types";
import type { Logform, Logger, transport } from "winston";
import * as winston from "winston";
import { isStringOfLength, isProperty } from "@dwtechs/checkard";

let defaultSN = "serviceName";
let defaultLocale = "fr-FR";
let defaultTZ = "europe/paris";
let defaultNodeEnv = "development";

// check for env variables
if (process?.env) {
  const { LOCALE, TZ, NODE_ENV, SERVICE_NAME } = process.env;
  defaultLocale = LOCALE || defaultLocale;
  defaultTZ = TZ || defaultTZ;
  defaultNodeEnv = NODE_ENV || defaultNodeEnv;
  defaultSN = SERVICE_NAME || defaultSN;
}
const defaultLvl = (defaultNodeEnv === "prod" || defaultNodeEnv === "production") ? "info" : "debug";
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// const colors = {
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   debug: "white",
// };
// winston.addColors(colors);

let lvl: Levels = defaultLvl;
let fmt = setFormat(defaultTZ, "serviceName");
const tpts = setTransports();

// YYYY-MM-DD HH:mm:ss:ms
function getTimezonedDate(timeZone: string): string {
  return new Date().toLocaleString(defaultLocale, { timeZone });
}

function getFormatDate(timeZone: string): string { 
  return isStringOfLength(timeZone, 2, 999) ? getTimezonedDate(timeZone) : getTimezonedDate(defaultTZ);
}

function setServiceName(serviceName: string): string {
  return isStringOfLength(serviceName, 1, 999) ? serviceName : defaultSN;
}

function setTransports(): transport[] {
  return [new winston.transports.Console()];
} 

function setFormat(tz: string, serviceName: string): Logform.Format {
  const dateFormat = getFormatDate(tz);
  const sn = setServiceName(serviceName);
  const snLog = sn ? `${sn} ` : "";
  return winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: dateFormat }),
    winston.format.align(),
    // winston.format.label({ label: 'right meow!' }),
    // winston.format.cli(),
    // winston.format.prettyPrint(),
    winston.format.printf(
      (info: Logform.TransformableInfo) => {
        const msg = info.message
          ?.toString()
           .replace(/[\n\r]+/g, "")
           .replace(/\s{2,}/g, " ");
        return `[${info.timestamp}] - ${snLog}${info.level}: ${msg}`;
    }),
  );
}

function init(timeZone: string, serviceName: string, level: Levels): void {
  lvl = isProperty(level, levels) ? level : lvl;
  fmt = setFormat(timeZone, serviceName);
}

const log = (): Logger => {
  return winston.createLogger({ 
    level:lvl, 
    silent: false,
    format: fmt, 
    levels, 
    transports: tpts
  });
}

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