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
 * @param {Partial<Record<Level, string>>} newColors - Object containing custom color mappings for log levels.
 *   - Can be a partial object with any combination of 'error', 'warn', 'info', 'debug' keys
 *   - Each value must be a valid ANSI escape code (e.g., '\x1b[31m' for red)
 *   - Pass null to skip color updates
 *   - Invalid objects, invalid log levels, or invalid ANSI codes are silently ignored
 * 
 * @returns {Record<Level, string>} The current color configuration object after applying changes
 * 
 * @example
 * // Set custom colors for error and warning levels
 * const colors = setColors({
 *   error: '\x1b[91m',  // Bright red
 *   warn: '\x1b[93m'    // Bright yellow
 * });
 * console.log(colors); // Shows all current color mappings
 * 
 * @example
 * // Set all colors at once
 * const allColors = setColors({
 *   error: '\x1b[31m',  // Red
 *   warn: '\x1b[33m',   // Yellow
 *   info: '\x1b[36m',   // Cyan
 *   debug: '\x1b[35m'   // Magenta
 * });
 * 
 * @example
 * // All calls return current colors
 * const colors1 = setColors(null);           // Returns current colors (no changes)
 * const colors2 = setColors("invalid");      // Returns current colors (ignored - not an object)
 * const colors3 = setColors({ invalid: '\x1b[31m' }); // Returns current colors (invalid level ignored)
 * const colors4 = setColors({ error: 'red' });        // Returns current colors (invalid ANSI ignored)
 */
function setColors(newColors: Partial<Record<Level, string>>): Record<Level, string> {
  // Validate that newColors is a valid object
  if (isObject(newColors)) {
    // Only update colors that exist in the original colors object and have valid ANSI codes
    for (const key in newColors) {
      const l = key as Level;
      const v = newColors[l];
      if (isProperty(colors, l) && isAnsiEscapeCode(v))
        colors[l] = v;
    }
  }
  return colors;
}

export { 
  getColor,
  setColors,
};