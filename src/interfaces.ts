import type { Levels } from "./types";

interface LogEntry {
  timestamp: string | { date: string; time: string };
  level: Levels;
  service?: string;
  message: string;
  id?: string | number;
  userId?: string | number;
  tags?: string[] | number[];
  [key: string]: any;
}

interface LoggerOptions {
  timeZone?: string;
  locale?: string;
  service?: string;
  level: Levels;
  colorize?: boolean;
}

export { LogEntry, LoggerOptions };