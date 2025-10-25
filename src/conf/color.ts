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

/**
 * Sets custom ANSI color codes for different log levels.
 * Only updates colors for valid log levels with valid ANSI escape codes.
 * 
 * @param {Partial<Record<Level, string>> | null} newColors - Object containing custom color mappings for log levels.
 *   - Can be a partial object with any combination of 'error', 'warn', 'info', 'debug' keys
 *   - Each value must be a valid ANSI escape code (e.g., '\x1b[31m' for red)
 *   - Pass null to skip color updates
 *   - Invalid objects, invalid log levels, or invalid ANSI codes are silently ignored
 * 
 * @returns {void}
 * 
 * @example
 * // Set custom colors for error and warning levels
 * setColors({
 *   error: '\x1b[91m',  // Bright red
 *   warn: '\x1b[93m'    // Bright yellow
 * });
 * 
 * @example
 * // Set all colors at once
 * setColors({
 *   error: '\x1b[31m',  // Red
 *   warn: '\x1b[33m',   // Yellow
 *   info: '\x1b[36m',   // Cyan
 *   debug: '\x1b[35m'   // Magenta
 * });
 * 
 * @example
 * // Invalid calls are safely ignored
 * setColors(null);           // No-op
 * setColors("invalid");      // Ignored - not an object
 * setColors({ invalid: '\x1b[31m' }); // Ignored - invalid level
 * setColors({ error: 'red' });        // Ignored - invalid ANSI code
 */
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