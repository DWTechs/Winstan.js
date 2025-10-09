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
    // Clean up message
    const cleanMessage = entry.message
      ?.toString()
      .replace(/[\n\r]+/g, "")
      .replace(/\s{2,}/g, " ");

    const service = this.options.service ? `${this.options.service} ` : "";
    const id = normalizeId(entry.id);
    const userId = normalizeUser(entry.userId);
    const tags = normalizeTags(entry.tags);
    
    const levelText = this.colorize(entry.level, entry.level);
    
    return `${entry.timestamp} - ${service}${levelText} - ${id}${userId}${tags}: ${cleanMessage}`;
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

export { Logger, LoggerOptions, LogEntry };
