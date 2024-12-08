import type { Logger } from "winston";
export type Levels = 'error' | 'warn' | 'info' | 'debug';
declare function init(timeZone: string, serviceName: string, level: Levels): void;
declare const log: () => Logger;

export { 
  init,
  log,
};
