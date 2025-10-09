// src/logger.ts
import type { Levels } from "./types";
import type { LogEntry, LoggerOptions } from "./interfaces";
import { normalizeId, normalizeUser, normalizeTags } from "./normalize";

class Logger {
  private options: LoggerOptions;
  private levels = { error: 0, warn: 1, info: 2, debug: 3 };
  private colors = {
    error: '\x1b[31m',   // Red
    warn: '\x1b[33m',    // Yellow
    info: '\x1b[34m',    // Blue
    debug: '\x1b[32m',   // Green
    reset: '\x1b[0m'     // Reset
  };

  constructor(options: LoggerOptions) {
    this.options = options;
  }

  private shouldLog(level: Levels): boolean {
    return this.levels[level] <= this.levels[this.options.level];
  }

  private formatTimestamp(): string {
    const tz = this.options.timeZone || "europe/paris";
    const locale = this.options.locale || "fr-FR";
    return new Date().toLocaleString(locale, { timeZone: tz });
  }

  private colorize(level: Levels, text: string): string {
    if (!this.options.colorize) return text;
    return `${this.colors[level]}${text}${this.colors.reset}`;
  }

  private formatMessage(entry: LogEntry): string {
    const service = this.options.service ? `${this.options.service} ` : "";
    const id = normalizeId(entry.id);
    const userId = normalizeUser(entry.userId);
    const tags = normalizeTags(entry.tags);
    
    const prefix = `${entry.timestamp} - ${service}${entry.level} - ${id}${userId}${tags}: `;
    const indent = ' '.repeat(prefix.length);
    
    // Split message by line breaks and format each line
    const lines = entry.message?.toString().split(/[\n\r]+/) || [];
    const formattedLines = lines.map((line, index) => {
      const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
      if (index === 0) {
        return this.colorize(entry.level, `${prefix}${trimmedLine}`);
      } else {
        return this.colorize(entry.level, `${indent}${trimmedLine}`);
      }
    });
    
    return formattedLines.join('\n');
  }

  private output(entry: LogEntry): void {
    const formattedMessage = this.formatMessage(entry);
    
    // Output to console
    if (entry.level === 'error') {
      console.error(formattedMessage);
    } else if (entry.level === 'warn') {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  }

  private log(level: Levels, message: string, id?: string | number, userId?: string | number, tags?: string[] | number[]): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
      id,
      userId,
      tags
    };

    this.output(entry);
  }

  error(message: string, id?: string | number, userId?: string | number, tags?: string[] | number[]): void {
    this.log('error', message, id, userId, tags);
  }

  warn(message: string, id?: string | number, userId?: string | number, tags?: string[] | number[]): void {
    this.log('warn', message, id, userId, tags);
  }

  info(message: string, id?: string | number, userId?: string | number, tags?: string[] | number[]): void {
    this.log('info', message, id, userId, tags);
  }

  debug(message: string, id?: string | number, userId?: string | number, tags?: string[] | number[]): void {
    this.log('debug', message, id, userId, tags);
  }

  // Method to update log level dynamically
  setLevel(level: Levels): void {
    this.options.level = level;
  }

  getLevel(): Levels {
    return this.options.level;
  }
}

// Global logger instance
let globalLogger: Logger;

/**
 * Initializes the logging configuration.
 *
 * @param timeZone - The time zone to be used for logging timestamps. If undefined, the default time zone will be used.
 * @param locale - The locale to be used for formatting dates. If undefined, the default locale will be used.
 * @param service - The name of the service for which the logging is being configured. If undefined, a default service name will be used.
 * @param level - The logging level to be set. This determines the severity of logs that will be captured.
 * 
 * @returns void
 */
function init(
  timeZone: string | undefined,
  locale: string | undefined,
  service: string | undefined,
  level: Levels
): void {
  const options: LoggerOptions = {
    timeZone,
    locale,
    service,
    level,
    colorize: true
  };
  
  globalLogger = new Logger(options);
}

// Initialize with environment variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
const defaultLevel: Levels = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// Initialize global logger
init(TZ, LOCALE, SERVICE_NAME, defaultLevel);

// Helper function to extract values from info object
function extractInfoValues(info?: Record<string, string | number | string[] | number[]>) {
  if (!info) return { id: undefined, userId: undefined, tags: undefined };
  
  const id = (typeof info.id === 'string' || typeof info.id === 'number') ? info.id : undefined;
  const userId = (typeof info.userId === 'string' || typeof info.userId === 'number') ? info.userId : undefined;
  const tags = Array.isArray(info.tags) ? info.tags : undefined;
  
  return { id, userId, tags };
}

// Export log interface matching README API
const log = {
  error: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    const { id, userId, tags } = extractInfoValues(info);
    globalLogger.error(msg, id, userId, tags);
  },
  warn: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    const { id, userId, tags } = extractInfoValues(info);
    globalLogger.warn(msg, id, userId, tags);
  },
  info: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    const { id, userId, tags } = extractInfoValues(info);
    globalLogger.info(msg, id, userId, tags);
  },
  debug: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    const { id, userId, tags } = extractInfoValues(info);
    globalLogger.debug(msg, id, userId, tags);
  }
};

export { init, log, Logger, LoggerOptions, LogEntry };
