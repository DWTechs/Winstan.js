// src/logger.ts
import type { Level } from "./types";
// import type { LogEntry, LoggerOptions } from "./unused/interfaces";
// import { normalizeInfo } from "./unused/info";
import { getLevels } from "./conf/level";



function formatMessage(entry: LogEntry): string {
  const service = options.service ? `service="${options.service}" ` : "";
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
      return colorize(entry.level, `${prefix}${trimmedLine} ${service}${info}`.trim());
    } else {
      return colorize(entry.level, `${indent}${trimmedLine}`);
    }
  });
  
  return formattedLines.join('\n');
}

function output(entry: LogEntry): void {
  const formattedMessage = formatMessage(entry);
  
  // Output to console
  if (entry.level === 'error') {
    console.error(formattedMessage);
  } else if (entry.level === 'warn') {
    console.warn(formattedMessage);
  } else {
    console.log(formattedMessage);
  }
}

function logMessage(level: Levels, message: string, info?: Record<string, string | number | string[] | number[]>): void {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    timestamp: formatTimestamp(),
    level,
    message,
    ...info
  };

  output(entry);
}

// Public API functions
function error(message: string, info?: Record<string, string | number | string[] | number[]>): void {
  logMessage('error', message, info);
}

function warn(message: string, info?: Record<string, string | number | string[] | number[]>): void {
  logMessage('warn', message, info);
}

function infoLog(message: string, info?: Record<string, string | number | string[] | number[]>): void {
  logMessage('info', message, info);
}

function debug(message: string, info?: Record<string, string | number | string[] | number[]>): void {
  logMessage('debug', message, info);
}

function setLevel(level: Levels): void {
  options.level = level;
}

function getLevel(): Levels {
  return options.level;
}

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
  options = {
    level: level ?? options.level,
    timeZone: timeZone ?? options.timeZone,
    locale: locale ?? options.locale,
    service: service ?? options.service,
    colorize: options.colorize
  };
}

// Initialize with environment variables
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
const defaultLevel: Levels = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// Initialize on module load
init(TZ, LOCALE, SERVICE_NAME, defaultLevel);

// Export log interface matching README API
const log = {
  error: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    error(msg, info);
  },
  warn: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    warn(msg, info);
  },
  info: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    infoLog(msg, info);
  },
  debug: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ) => {
    debug(msg, info);
  }
};

export { init, log, setLevel, getLevel, LoggerOptions, LogEntry };
