import type { Levels, Options } from "./types";
import type { Logform, transport } from "winston";
import * as winston from "winston";
import { isStringOfLength, isProperty } from "@dwtechs/checkard";

let defaultSN = "";
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

const colors = {
  error: "red",
  warn: "orange",
  info: "blue",
  debug: "green",
};

// Init logger with default Values
let lvl: Levels = defaultLvl;
const tpts = setTransports();
let fmt = init({ timeZone: defaultTZ, 
                 locale: defaultLocale, 
                 serviceName: defaultSN,
                 level: defaultLvl 
              });

function setDateFormat(timeZone: string, locale: string): string { 
  timeZone = isStringOfLength(timeZone, 2, 999) ? timeZone : defaultTZ;
  locale = isStringOfLength(locale, 5, 5) ? locale : defaultLocale;  
  return new Date().toLocaleString(locale, { timeZone });
}

function setServiceName(serviceName: string): string {
  return isStringOfLength(serviceName, 1, 999) ? serviceName : defaultSN;
}

function setTransports(): transport[] {
  return [new winston.transports.Console()];
} 

function setFormat(format: string, serviceName: string): Logform.Format {
  const snLog = serviceName ? `${serviceName} ` : "";
  return winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format }), // YYYY-MM-DD HH:mm:ss:ms
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

function init(options: Options): Logform.Format {
  lvl = isProperty(options.level, levels) ? options.level : lvl;
  const dateFormat = setDateFormat(options.timeZone, options.locale);
  const sn = setServiceName(options.serviceName);
  return setFormat(dateFormat, sn);
}

const log = winston.createLogger({ 
    level: lvl,
    silent: false,
    format: fmt,
    levels,
    transports: tpts
  });

winston.addColors(colors);

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