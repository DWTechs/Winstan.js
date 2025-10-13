import type { Level } from "../types";
import { isObject, isProperty, isAnsiColor } from "@dwtechs/checkard";

const colors = {
  error: '\x1b[31m',   // Red
  warn: '\x1b[33m',    // Yellow
  info: '\x1b[34m',    // Blue
  debug: '\x1b[32m',   // Green
};

// // Regex to validate ANSI escape codes
// // Matches patterns like \x1b[31m, \x1b[0m, \x1b[1;32m, etc.
// const ansiColorRegex = /^\\x1b\[\d+(;\d+)*m$/;

// function isAnsiColor(v: unknown): v is string {
//   return isString(v, "!0") && ansiColorRegex.test(v);
// }

function getColor(level:Level): string {
  return colors[level];
}

function setColors(newColors: Partial<Record<string, string>>): void {
  // Validate that newColors is a valid object
  if (!isObject(newColors))
    return;

  // Only update colors that exist in the original colors object and have valid ANSI codes
  for (const key in newColors) {
    const v = newColors[key];
    if (isProperty(colors, key) && isAnsiColor(v))
      colors[key] = v;
  }
}

export { 
  getColor,
  setColors,
};