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

function setColors(newColors: Partial<Record<Level, string>> | null): void {
  // Validate that newColors is a valid object or null
  if (!isObject(newColors) && newColors !== null)
    return;

  // Only update colors that exist in the original colors object and have valid ANSI codes
  for (const key in newColors) {
    const l = key as Level;
    const v = newColors[l];
    if (isProperty(colors, l) && isAnsiEscapeCode(v))
      colors[l] = v;
  }
}

export { 
  getColor,
  setColors,
};