import { getColor } from "../conf/color";
import type { Level } from "../types";

// Check environment variables at startup
const { COLORIZE, NODE_ENV } = process?.env ?? null;

// Determine colorization setting once at startup
let colorize: boolean;
if (COLORIZE !== undefined)
  colorize = COLORIZE !== "false" && COLORIZE !== "0"; // If COLORIZE is explicitly set, respect that setting
else {
  // Default behavior: colors in development, no colors in production
  const isProd = NODE_ENV === "production" || NODE_ENV === "prod";
  colorize = !isProd;
}

const reset = '\x1b[0m';

function formatColor(level: Level, text: string): string {
  if (!colorize) return text;
  return `${getColor(level)}${text}${reset}`;
}

/**
 * Sets whether log output should include ANSI color codes.
 * 
 * @param {boolean} clr - Whether to enable colorization
 *   - true: Enable ANSI color codes in log output
 *   - false: Disable ANSI color codes (plain text output)
 * 
 * @returns {boolean} The current colorization state after the operation
 * 
 * @example
 * // Enable colors for terminal output
 * setColorize(true);
 * 
 * @example
 * // Disable colors for file logging or CI/CD
 * setColorize(false);
 * 
 * @example
 * // Toggle based on environment detection
 * const isTerminal = process.stdout.isTTY;
 * setColorize(isTerminal);
 */
function setColorize(clr: boolean): boolean {
  colorize = clr;
  return colorize;
}

export { 
  formatColor,
  setColorize,
};