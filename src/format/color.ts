import { getColor } from "../conf/color";
import type { Level } from "../types";

// check for env variables
const { COLORIZE } = process?.env ?? null;

let colorize = COLORIZE !== "false" && COLORIZE !== "0";
const reset = '\x1b[0m';

function formatColor(level: Level, text: string): string {
  if (!colorize) return text;
  return `${getColor(level)}${text}${reset}`;
}

export { 
  formatColor,
};