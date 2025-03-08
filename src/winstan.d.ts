import type { Logform } from "winston";

export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  service: string;
  level: Levels; 
};

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): Logform.Format;
declare const log: {
    error: (msg: string, id?: string | number | undefined, user?: string | number | undefined, tags?: string[] | number[] | undefined) => void;
    warn: (msg: string, id?: string | number | undefined, user?: string | number | undefined, tags?: string[] | number[] | undefined) => void;
    info: (msg: string, id?: string | number | undefined, user?: string | number | undefined, tags?: string[] | number[] | undefined) => void;
    debug: (msg: string, id?: string | number | undefined, user?: string | number | undefined, tags?: string[] | number[] | undefined) => void;
};

export { 
  init,
  log,
};
