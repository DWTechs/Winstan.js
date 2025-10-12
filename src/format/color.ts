import { colors, colorize, reset } from "../conf/color";
import type { Level } from "../types";

function formatColor(level: Level, text: string): string {
  if (!colorize) return text;
  return `${colors[level]}${text}${reset}`;
}

export { 
  formatColor,
};