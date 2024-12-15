import type { Logform } from "winston";
import type winston from "winston";
import type { Request, Response, NextFunction } from 'express';

interface MyRequest extends Request {
  perf: number;
}

export type Levels = 'error' | 'warn' | 'info' | 'debug';
export type Options = {
  timeZone: string;
  locale: string;
  serviceName: string;
  level: Levels; 
};

declare function init(options: Options): Logform.Format;
declare const log: winston.Logger;

declare function start(req: MyRequest, _res: Response, next: NextFunction): void;
declare function end(req: MyRequest, _res: Response, next: NextFunction): void;
declare const perf: {
  start: typeof start;
  end: typeof end;
};

export { 
  init,
  log,
  perf,
};
