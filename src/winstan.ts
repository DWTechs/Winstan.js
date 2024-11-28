import type { Levels } from "./types";
import winston/*, { transports, format, addColors, createLogger }*/ from "winston";
import { isStringOfLength, isCustomType } from "@dwtechs/checkard";

let defaultSN = "serviceName";
let defaultTZ = "europe/paris";
let defaultNodeEnv = "development";

// check for env variables
if (process?.env) {
  const { TZ, NODE_ENV, SERVICE_NAME } = process.env;
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
let format = setFormat(defaultTZ, "serviceName");
const transports = setTransports();

function setTimeZone(timeZone: string): string { 
  return isStringOfLength(timeZone, 2, 999) ? timeZone : defaultTZ;
}

function setServiceName(serviceName: string): string {
  return isStringOfLength(serviceName, 1, 999) ? serviceName : defaultSN;
}

function setTransports(): winston.transport[] {
  return [new winston.transports.Console()];
} 

function setFormat(timeZone: string, serviceName: string): winston.format {
  const tz = setTimeZone(timeZone);
  const sn = setServiceName(serviceName);
  const snLog = sn ? `${sn} ` : "";
  return winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms", tz }),
    winston.format.align(),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo) =>
        `[${info.timestamp}] - ${snLog}${info.level}: ${info.message
          ?.replace(/[\n\r]+/g, "")
          .replace(/\s{2,}/g, " ")}`,
    ),
  );
}

function initLogger(timeZone: string, serviceName: string, level: Levels): void {
  lvl = isCustomType(level, levels) ? level : lvl;
  format = setFormat(timeZone, serviceName);
}

const log = (): winston.Logger => {
  return winston.createLogger({ lvl, levels, format, transports });
}

export {
  initLogger, 
  log,
}


// const errors = [
// 	{ code: 400, level: "warn", name: "Bad request" },
// 	{ code: 401, level: "warn", name: "Unauthorized" },
// 	{ code: 404, level: "warn", name: "Not found" },
// 	{ code: 500, level: "error", name: "Internal" },
// 	{ code: 503, level: "error", name: "Unavailable" },
// ];