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

/**
 * Sets the minimum logging level for the logger.
 * Only logs at or above this level will be output.
 * 
 * @param {Level} lvl - The logging level to set. Must be one of: 'error', 'warn', 'info', 'debug'
 *   - 'error' (0): Only error messages
 *   - 'warn' (1): Warning and error messages  
 *   - 'info' (2): Info, warning, and error messages
 *   - 'debug' (3): All messages including debug output
 * 
 * @returns {Level} The current logging level after the operation.
 *   - If the provided level is valid, returns the new level
 *   - If the provided level is invalid, returns the unchanged current level
 * 
 * @example
 * // Set to only show errors and warnings
 * setLevel('warn');
 * console.log(getLevel()); // 'warn'
 * 
 * @example
 * // Set to show all log messages
 * setLevel('debug');
 * 
 * @example
 * // Invalid level is ignored, returns current level
 * setLevel('invalid'); // Returns current level unchanged
 * 
 * @example
 * // Production setup - minimal logging
 * setLevel('error');
 * 
 * @example
 * // Development setup - verbose logging  
 * setLevel('debug');
 */
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
