import { log } from "./winstan";
import type { Request, Response, NextFunction } from 'express';

interface MyRequest extends Request {
  perf: number;
}

/**
 * A function that logs the request start and sets the request performance timestamp.
 *
 * @param {type} req - The request object
 * @param {type} _res - The response object
 * @param {type} next - The next function
 * @return {type} undefined
 */
function start(req: MyRequest, _res: Response, next: NextFunction) {
  log.info(`Request started on ${req.method}${req.url}`);
  req.perf = Date.now();
  next();
}

/**
 * Logs the end of a request and calculates the time it took.
 *
 * @param {Object} req - The request object
 * @param {Object} _res - The response object
 * @param {Function} next - The next function in the middleware chain
 * @return {void} This function does not return anything
 */
function end(req: MyRequest, _res: Response, next: NextFunction) {
  const delta = req.perf ? Date.now() - req.perf : 0;
  log.info(`Request ended on ${req.method}${req.url} in ${delta}ms`);
  next();
}

export default {
  start,
  end,
};