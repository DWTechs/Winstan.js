import { isString } from "@dwtechs/checkard";
import { shouldLog } from "./conf/level.js";
import { formatMisc } from "./format/misc.js";
import { formatColor } from "./format/color.js";
import { formatDate } from "./format/date.js";
import { formatTxt } from "./format/txt.js";
import { formatService } from "./format/service.js";
import type { Level } from "./types";

function msg(lvl: Level, txt: string, ctx: Record<string, string | number | string[] | number[]>): string {
  
  const ts = formatDate();
  const misc = formatMisc(ctx);
  const service = formatService();
  const l = `level=${lvl}`;
  
  // Check environment for output format (dynamic check)
  const isProduction = process?.env?.NODE_ENV === "production" || process?.env?.NODE_ENV === "prod";
  
  // Production format: pure logfmt (single line with escaped newlines)
  if (isProduction) {
    let logfmtLine = `${ts} ${l}`;
    
    // Add service name if configured
    if (service)
      logfmtLine += ` ${service}`;
    
    // Add context fields using formatMisc
    if (misc)
      logfmtLine += ` ${misc}`;

    // Add message (with escaped newlines for pure logfmt compliance)
    const formattedTxt = formatTxt(txt);
    logfmtLine += ` msg=${formattedTxt}`;
    
    return formatColor(lvl, logfmtLine);
  }
  
  // Development format (default): human-readable multiline
  const lines = txt?.toString().split(/[\n\r]+/) || [];
  if (lines.length > 1) {
    let result = '';
    lines.forEach((line, i) => {
      const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
      if (i === 0) {
        // First line uses the full context
        let firstLine = `${ts} ${l}`;
        
        if (service)
          firstLine += ` ${service}`;
        
        if (misc)
          firstLine += ` ${misc}`;
        firstLine += ` msg=${formatTxt(trimmedLine)}`;
        result += formatColor(lvl, firstLine);
      } else {
        // Subsequent lines are indented for better readability
        result += '\n' + formatColor(lvl, `  ${trimmedLine}`);
      }
    });
    return result;
  }
  
  // Single line in development mode
  let logfmtLine = `${ts} ${l}`;
  
  if (service)
    logfmtLine += ` ${service}`;
  
  // Add context fields using formatMisc
  if (misc)
    logfmtLine += ` ${misc}`;
  
  // Add message (no escaping in development for readability)
  const formattedTxt = formatTxt(txt);
  logfmtLine += ` msg=${formattedTxt}`;
  
  return formatColor(lvl, logfmtLine);
}


// // Initialize with environment variables
// const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
// const defaultLevel: Level = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// // Initialize on module load
// init(TZ, LOCALE, SERVICE_NAME, defaultLevel);


function print(
  lvl: Level,
  txt: string,
  ctx?: Record<string, string | number | string[] | number[]>
): void {
  
  if (!shouldLog(lvl))
    return;

  if (!isString(txt, "!0"))
    return;
  
  const m = msg(lvl, txt, ctx || {});
  
  // Output to console
  if (lvl === 'error')
    console.error(m);
  else if (lvl === 'warn')
    console.warn(m);
  else
    console.log(m);

}

/**
 * Main logging interface providing structured logging with logfmt output format.
 * Supports four log levels with environment-based formatting and contextual information.
 * 
 * @namespace log
 * 
 * @description
 * The log object provides methods for different severity levels:
 * - error: Critical errors that need immediate attention
 * - warn: Warning conditions that should be noted
 * - info: General information messages  
 * - debug: Detailed information for debugging
 * 
 * Features:
 * - Environment-based formatting (development: multiline, production: escaped)
 * - Automatic timestamp inclusion with configurable timezone
 * - Service name integration when configured
 * - Context fields for structured logging
 * - Level-based filtering and colored output
 * - Logfmt compliance for log aggregation systems
 * 
 * @example
 * // Basic logging
 * log.info('Application started');
 * log.error('Database connection failed');
 * log.warn('Memory usage high');
 * log.debug('Processing user request');
 * 
 * @example
 * // Logging with context
 * log.info('User logged in', { 
 *   userId: 12345, 
 *   email: 'user@example.com',
 *   ip: '192.168.1.100'
 * });
 * 
 * @example
 * // Error logging with stack trace context
 * log.error('Payment processing failed', {
 *   orderId: 'ORD-123',
 *   amount: 99.99,
 *   errorCode: 'CARD_DECLINED'
 * });
 * 
 * @example
 * // Development output (multiline for readability):
 * // 2023-12-25T10:30:45.123+01:00 level=info service=user-api userId=12345 msg="User logged in"
 * 
 * @example
 * // Production output (escaped newlines):
 * // 2023-12-25T09:30:45.123Z level=info service=user-api userId=12345 msg="User logged in"
 */
const log = {
  /**
   * Logs error messages for critical issues requiring immediate attention.
   * Uses console.error() for output and appears in red when colors are enabled.
   * 
   * @param {string} txt - The error message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.error('Database connection timeout');
   * log.error('Authentication failed', { userId: 123, reason: 'invalid_token' });
   */
  error: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('error', txt, ctx);
  },
  
  /**
   * Logs warning messages for conditions that should be noted but don't require immediate action.
   * Uses console.warn() for output and appears in yellow when colors are enabled.
   * 
   * @param {string} txt - The warning message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.warn('API rate limit approaching');
   * log.warn('Deprecated function used', { function: 'oldMethod', caller: 'userService' });
   */
  warn: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('warn', txt, ctx);
  },
  
  /**
   * Logs informational messages for general application events.
   * Uses console.log() for output and appears in blue when colors are enabled.
   * 
   * @param {string} txt - The information message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.info('Server started on port 3000');
   * log.info('User action completed', { action: 'purchase', userId: 456, amount: 29.99 });
   */
  info: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('info', txt, ctx);
  },
  
  /**
   * Logs debug messages for detailed information useful during development and troubleshooting.
   * Uses console.log() for output and appears in green when colors are enabled.
   * Only shown when log level is set to 'debug'.
   * 
   * @param {string} txt - The debug message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.debug('Cache miss for key', { key: 'user:123', ttl: 300 });
   * log.debug('SQL query executed', { query: 'SELECT * FROM users', duration: '15ms' });
   */
  debug: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('debug', txt, ctx);
  }
};


export { log, msg };
