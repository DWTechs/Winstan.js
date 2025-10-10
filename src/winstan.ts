// src/logger.ts
import type { Levels } from "./types";
import type { LogEntry, LoggerOptions } from "./interfaces";
import { normalizeInfo } from "./info";
import { getLevels } from "./level";

class Logger {
  #options: Required<LoggerOptions>;
  #colors = {
    error: '\x1b[31m',   // Red
    warn: '\x1b[33m',    // Yellow
    info: '\x1b[34m',    // Blue
    debug: '\x1b[32m',   // Green
    reset: '\x1b[0m'     // Reset
  };

  constructor(options: LoggerOptions = {}) {

    this.#options = {
      level: options.level ? options.level : 'debug',
      timeZone: options.timeZone ? options.timeZone : 'Europe/Paris',
      locale: options.locale ? options.locale : 'fr-FR',
      service: options.service ? options.service : undefined,
      colorize: options.colorize ? options.colorize : true,
      
    } as Required<LoggerOptions>;
  }

  #shouldLog(level: Levels): boolean {
    const levels = getLevels();
    return levels[level] <= levels[this.#options.level];
  }

  #formatTimestamp(): { date: string; time: string } {
    const now = new Date();
    const date = now.toLocaleDateString(this.#options.locale, { timeZone: this.#options.timeZone });
    const time = now.toLocaleTimeString(this.#options.locale, { timeZone: this.#options.timeZone });
    const ms = now.getMilliseconds().toString().padStart(3, '0');
    return { date, time: `${time}:${ms}` };
  }

  #colorize(level: Levels, text: string): string {
    if (!this.#options.colorize) return text;
    return `${this.#colors[level]}${text}${this.#colors.reset}`;
  }

  #formatMessage(entry: LogEntry): string {
    const service = this.#options.service ? `service="${this.#options.service}" ` : "";
    const info = normalizeInfo(entry as any);
    const { date, time } = entry.timestamp as any;
    
    // Pad level to 5 characters (length of "debug" and "error")
    const paddedLevel = entry.level.padEnd(5, ' ');
    const prefix = `${paddedLevel} | date=${date} time=${time} `;
    const indent = ' '.repeat(prefix.length);
    
    // Split message by line breaks and format each line
    const lines = entry.message?.toString().split(/[\n\r]+/) || [];
    const formattedLines = lines.map((line, index) => {
      const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
      if (index === 0) {
        return this.#colorize(entry.level, `${prefix}${trimmedLine} ${service}${info}`.trim());
      } else {
        return this.#colorize(entry.level, `${indent}${trimmedLine}`);
      }
    });
    
    return formattedLines.join('\n');
  }

  #output(entry: LogEntry): void {
    const formattedMessage = this.#formatMessage(entry);
    
    // Output to console
    if (entry.level === 'error') {
      console.error(formattedMessage);
    } else if (entry.level === 'warn') {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  }

  #log(level: Levels, message: string, info?: Record<string, string | number | string[] | number[]>): void {
    if (!this.#shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: this.#formatTimestamp(),
      level,
      message,
      ...info
    };

    this.#output(entry);
  }

  error(message: string, info?: Record<string, string | number | string[] | number[]>): void {
    this.#log('error', message, info);
  }

  warn(message: string, info?: Record<string, string | number | string[] | number[]>): void {
    this.#log('warn', message, info);
  }

  info(message: string, info?: Record<string, string | number | string[] | number[]>): void {
    this.#log('info', message, info);
  }

  debug(message: string, info?: Record<string, string | number | string[] | number[]>): void {
    this.#log('debug', message, info);
  }

  // Method to update log level dynamically
  setLevel(level: Levels): void {
    this.#options.level = level;
  }

  getLevel(): Levels {
    return this.#options.level || 'debug';
  }
}

// Global logger instance
let globalLogger: Logger;

/**
 * Initializes the logging configuration.
 *
 * @param timeZone - The time zone to be used for logging timestamps. Defaults to 'Europe/Paris'.
 * @param locale - The locale to be used for formatting dates. Defaults to 'fr-FR'.
 * @param service - The name of the service for which the logging is being configured. Defaults to undefined (no service name).
 * @param level - The logging level to be set. This determines the severity of logs that will be captured. Defaults to 'debug'.
 * 
 * @returns void
 */
function init(
  timeZone?: string,
  locale?: string,
  service?: string,
  level?: Levels
): void {
  const options: LoggerOptions = {
    timeZone,
    locale,
    service,
    level
  };
  
  globalLogger = new Logger(options);
}

// Initialize with environment variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
const defaultLevel: Levels = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// Initialize global logger
init(TZ, LOCALE, SERVICE_NAME, defaultLevel);

// Export log interface matching README API
const log = {
  error: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    globalLogger.error(msg, info);
  },
  warn: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    globalLogger.warn(msg, info);
  },
  info: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    globalLogger.info(msg, info);
  },
  debug: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    globalLogger.debug(msg, info);
  }
};

export { init, log, Logger, LoggerOptions, LogEntry };
