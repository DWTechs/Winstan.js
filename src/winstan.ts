import type { Levels, Options } from "./types";
import type { Logform, transport } from "winston";
import winston from "winston";
import { 
  isStringOfLength, 
  isProperty, 
  isValidInteger, 
  isString 
} from "@dwtechs/checkard";

let defaultUser = ""
let defaultService = "";
let defaultLocale = "fr-FR";
let defaultTZ = "europe/paris";
let nodeEnv = "development";

// check for env variables
if (process?.env) {
  const { LOCALE, TZ, NODE_ENV, SERVICE_NAME, SYSTEM_USER_NAME } = process.env;
  defaultLocale = LOCALE || defaultLocale;
  defaultTZ = TZ || defaultTZ;
  nodeEnv = NODE_ENV || nodeEnv;
  defaultService = SERVICE_NAME || defaultService;
  defaultUser = SYSTEM_USER_NAME || defaultUser;
}

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
let displayedLevel: Levels = (nodeEnv === "prod" || nodeEnv === "production") ? "info" : "debug";
const tpts = setTransports();
const fmt = init({ 
  timeZone: defaultTZ, 
  locale: defaultLocale, 
  service: defaultService,
  level: displayedLevel 
});

function setDateFormat(timeZone: string, locale: string): string { 
  const tz = isStringOfLength(timeZone, 2, 999) ? timeZone : defaultTZ;
  const l = isStringOfLength(locale, 5, 5) ? locale : defaultLocale;  
  return new Date().toLocaleString(l, { timeZone: tz });
}

function setService(service: string): string {
  return isStringOfLength(service, 1, 99) ? service : defaultService;
}

function setUser(user: string | number): string | number {
  return ((isString(user) && isStringOfLength(user, 1, 99)) || isValidInteger(user, 1, 99)) ? `${user} - ` : defaultUser;
}

function setAction(action: string): string {
  return action ? `[${action}] ` : "";
}

function setLevel(lvl: Levels): Levels {
  return isProperty(levels, lvl) ? lvl : "debug";
}

function setTransports(): transport[] {
  return [new winston.transports.Console()];
} 

function setFormat(format: string, service: string): Logform.Format {
  const snLog = service ? `${service} ` : "";
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
  displayedLevel = setLevel(options.level);
  const dateFormat = setDateFormat(options.timeZone, options.locale);
  const service = setService(options.service);
  return setFormat(dateFormat, service);
}

const logger = winston.createLogger({ 
    level: displayedLevel,
    silent: false,
    format: fmt,
    levels,
    transports: tpts
  });

winston.addColors(colors);

function normalize(lvl: Levels, msg: string, user: string | number, action: string ): void{
  if (!isString(msg, "!0"))
    return;
  const u = setUser(user);
  const a = setAction(action);
  const m = `${a}${u}${msg}`;
  logger[lvl](m);
}

const log = {
  error: (msg: string, user: string | number, action: string ) => {
    normalize('error', msg, user, action);
  },
  warn: (msg: string, user: string | number, action: string ) => {
    normalize('warn', msg, user, action);
  },
  info: (msg: string, user: string | number, action: string ) => {
    normalize('info', msg, user, action);
  },
  debug: (msg: string, user: string | number, action: string ) => {
    normalize('debug', msg, user, action);
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