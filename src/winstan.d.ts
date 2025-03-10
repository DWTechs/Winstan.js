import type { Logform } from "winston";

export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  service: string;
  level: Levels; 
};

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): void;
declare const log: {
  error: (msg: string, id?: string | number, user?: string | number, tags?: string[] | number[]) => void;
  warn: (msg: string, id?: string | number, user?: string | number, tags?: string[] | number[]) => void;
  info: (msg: string, id?: string | number, user?: string | number, tags?: string[] | number[]) => void;
  debug: (msg: string, id?: string | number, user?: string | number, tags?: string[] | number[]) => void;
};

export { 
  init,
  log,
};
