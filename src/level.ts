import type { Level } from "./types";
import { isProperty } from "@dwtechs/checkard";

// check for env variables
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

function getLevels(): Record<string, number> {
  return levels;
}

function getLevel(): Level {
  return level;
}

function setLevel(lvl: Level): Level {
  level = isProperty(levels, lvl) ? lvl : level;
  return level;
}

setLevel((NODE_ENV === "prod" || NODE_ENV === "production") ? prod : dev);

export {
  getLevels,
  getLevel,
  setLevel
}
