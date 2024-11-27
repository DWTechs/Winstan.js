import type { Levels } from "./types";
import winston/*, { transports, format, addColors, createLogger }*/ from "winston";
import { isStringOfLength } from "@dwtechs/checkard";

// Start 
// const level = (nodeEnv === "development") ? "debug" : "warn";
// init("europe/paris", "serviceName", level);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "white",
};
winston.addColors(colors);

const defaultLvl = "debug";
const defaultTZ = "europe/paris";
const defaultSN = "serviceName";
let lvl: Levels = setLevel(defaultLvl);
let format = setFormat(defaultTZ, "serviceName");
const transports = setTransports();

// Type guard function to check if a value is of type Levels
function isLevel(level: any): level is Levels {
  if (!isStringOfLength(level, 4, 5)) 
    return false;
  // return levels.includes(level);
  return Object.keys(levels).includes(level);
}

function setLevel(level: Levels): Levels {
  return isLevel(level) ? level : lvl;
}

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
  return winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms", tz: setTimeZone(timeZone) }),
    winston.format.align(),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo) =>
        `[${info.timestamp}] - ${setServiceName(serviceName)} ${info.level}: ${info.message
          ?.replace(/[\n\r]+/g, "")
          .replace(/\s{2,}/g, " ")}`,
    ),
  );
}

function init(timeZone: string, serviceName: string, level: Levels): void {
  lvl = setLevel(level);
  format = setFormat(timeZone, serviceName);
}

function log(): winston.Logger {
  return winston.createLogger({ lvl, levels, format, transports });
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