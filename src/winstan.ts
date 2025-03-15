import type { Levels, Infos } from "./types";
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
  infos: Infos
): void {
  if (!isString(msg, "!0"))
    return;
  logger[lvl](msg, infos);
}

const log = {
  error: (
    msg: string,
    infos: Infos,
  ) => {
    print('error', msg, infos);
  },
  warn: (
    msg: string,
    infos: Infos,
  ) => {
    print('warn', msg, infos);
  },
  info: (
    msg: string,
    infos: Infos,
  ) => {
    print('info', msg, infos);
  },
  debug: (
    msg: string,
    infos: Infos,
  ) => {
    print('debug', msg, infos);
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