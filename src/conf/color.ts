import type { Level } from "../types";
import { isObject, isProperty, isAnsiEscapeCode } from "@dwtechs/checkard";

const colors = {
  error: '\x1b[31m',   // Red
  warn: '\x1b[33m',    // Yellow
  info: '\x1b[34m',    // Blue
  debug: '\x1b[32m',   // Green
};

function getColor(level:Level): string {
  return colors[level] || '';
}

function setColors(newColors: Partial<Record<string, string>> | null): void {
  // Validate that newColors is a valid object or null
  if (!isObject(newColors) && newColors !== null)
    return;

  // Only update colors that exist in the original colors object and have valid ANSI codes
  for (const key in newColors) {
    const v = newColors[key];
    if (isProperty(colors, key) && isAnsiEscapeCode(v))
      colors[key] = v;
  }
}

export { 
  getColor,
  setColors,
};