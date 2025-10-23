import type { Level } from "../types";
import { isProperty } from "@dwtechs/checkard";

const { NODE_ENV } = process?.env ?? null;

const dev = "debug";
const prod = "info";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

let level: Level = dev;

function getLevel(): Level {
  return level;
}

function setLevel(lvl: Level): Level {
  level = isProperty(levels, lvl) ? lvl : level;
  return level;
}

function shouldLog(lev: Level): boolean {
  return levels[lev] <= levels[level];
}

setLevel((NODE_ENV === "prod" || NODE_ENV === "production") ? prod : dev);

export {
  getLevel,
  setLevel,
  shouldLog,
}
