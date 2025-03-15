import type { Logform } from "winston";
export type Levels = 'error' | 'warn' | 'info' | 'debug';

declare function init(timeZone: string | undefined, locale: string | undefined, service: string | undefined, level: Levels): void;
declare const log: {
  error: (msg: string, info?: Logform.TransformableInfo) => void;
  warn: (msg: string, info?: Logform.TransformableInfo) => void;
  info: (msg: string, info?: Logform.TransformableInfo) => void;
  debug: (msg: string, info?: Logform.TransformableInfo) => void;
};

export { 
  init,
  log,
};
