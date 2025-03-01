import type { Logform } from "winston";
import type winston from "winston";

export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  service: string;
  level: Levels; 
};

declare function init(options: Options): Logform.Format;
declare const log: winston.Logger;

export { 
  init,
  log,
};
