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
  level?: Levels;
  timeZone?: string;
  locale?: string;
  service?: string;
  colorize?: boolean;
}

export { LogEntry, LoggerOptions };