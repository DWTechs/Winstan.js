
import type { Level } from "../types.js";

interface Options {
  level?: Level;
  timeZone?: string;
  locale?: string;
  service?: string;
  colorize?: boolean;
}

export { Options };