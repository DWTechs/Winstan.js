import type { Levels } from "./types";
import { isProperty } from "@dwtechs/checkard";


const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
let level: Levels = "debug";

function getLevels(): Record<string, number> {
  return levels;
}

function getLevel(): Levels {
  return level;
}

function setLevel(lvl: Levels): Levels {
  level = isProperty(levels, lvl) ? lvl : level;
  return level;
}

export {
  getLevels,
  getLevel,
  setLevel
}
