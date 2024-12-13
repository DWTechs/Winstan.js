import type { Logger, Logform } from "winston";
export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  serviceName: string;
  level: Levels; 
};
declare function init(options: Options): Logform.Format;
declare const log: () => Logger;

export { 
  init,
  log,
};
