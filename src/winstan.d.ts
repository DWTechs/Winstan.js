import type { Logform } from "winston";

export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  service: string;
  level: Levels; 
};

declare function init(options: Options): Logform.Format;
declare const log: {
  error: (msg: string, user: string | number, action: string) => void;
  warn: (msg: string, user: string | number, action: string) => void;
  info: (msg: string, user: string | number, action: string) => void;
  debug: (msg: string, user: string | number, action: string) => void;
};

export { 
  init,
  log,
};
