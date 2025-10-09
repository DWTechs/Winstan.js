/*
MIT License

Copyright (c) 2020 DWTechs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/DWTechs/Winstan.js
*/

import { isString, isValidInteger, isArray } from '@dwtechs/checkard';

function normalizeId(id) {
    return (isString(id, "!0") || isValidInteger(id, 1)) ? `id: ${id} - ` : "";
}
function normalizeUser(user) {
    return (isString(user, "!0") || isValidInteger(user, 1)) ? `user: ${user} - ` : "";
}
function normalizeTags(tags) {
    return isArray(tags, ">", 0) ? `[${tags.toString()}] ` : "";
}

var _a;
class Logger {
    constructor(options) {
        this.levels = { error: 0, warn: 1, info: 2, debug: 3 };
        this.colors = {
            error: '\x1b[31m',
            warn: '\x1b[33m',
            info: '\x1b[34m',
            debug: '\x1b[32m',
            reset: '\x1b[0m'
        };
        this.options = options;
    }
    shouldLog(level) {
        return this.levels[level] <= this.levels[this.options.level];
    }
    formatTimestamp() {
        const tz = this.options.timeZone || "europe/paris";
        const locale = this.options.locale || "fr-FR";
        return new Date().toLocaleString(locale, { timeZone: tz });
    }
    colorize(level, text) {
        if (!this.options.colorize)
            return text;
        return `${this.colors[level]}${text}${this.colors.reset}`;
    }
    formatMessage(entry) {
        var _a;
        const service = this.options.service ? `${this.options.service} ` : "";
        const id = normalizeId(entry.id);
        const userId = normalizeUser(entry.userId);
        const tags = normalizeTags(entry.tags);
        const prefix = `${entry.timestamp} - ${service}${entry.level} - ${id}${userId}${tags}: `;
        const indent = ' '.repeat(prefix.length);
        const lines = ((_a = entry.message) === null || _a === void 0 ? void 0 : _a.toString().split(/[\n\r]+/)) || [];
        const formattedLines = lines.map((line, index) => {
            const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
            if (index === 0) {
                return this.colorize(entry.level, `${prefix}${trimmedLine}`);
            }
            else {
                return this.colorize(entry.level, `${indent}${trimmedLine}`);
            }
        });
        return formattedLines.join('\n');
    }
    output(entry) {
        const formattedMessage = this.formatMessage(entry);
        if (entry.level === 'error') {
            console.error(formattedMessage);
        }
        else if (entry.level === 'warn') {
            console.warn(formattedMessage);
        }
        else {
            console.log(formattedMessage);
        }
    }
    log(level, message, id, userId, tags) {
        if (!this.shouldLog(level))
            return;
        const entry = {
            timestamp: this.formatTimestamp(),
            level,
            message,
            id,
            userId,
            tags
        };
        this.output(entry);
    }
    error(message, id, userId, tags) {
        this.log('error', message, id, userId, tags);
    }
    warn(message, id, userId, tags) {
        this.log('warn', message, id, userId, tags);
    }
    info(message, id, userId, tags) {
        this.log('info', message, id, userId, tags);
    }
    debug(message, id, userId, tags) {
        this.log('debug', message, id, userId, tags);
    }
    setLevel(level) {
        this.options.level = level;
    }
    getLevel() {
        return this.options.level;
    }
}
let globalLogger;
function init(timeZone, locale, service, level) {
    const options = {
        timeZone,
        locale,
        service,
        level,
        colorize: true
    };
    globalLogger = new Logger(options);
}
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = (_a = process === null || process === void 0 ? void 0 : process.env) !== null && _a !== void 0 ? _a : {};
const defaultLevel = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";
init(TZ, LOCALE, SERVICE_NAME, defaultLevel);
function extractInfoValues(info) {
    if (!info)
        return { id: undefined, userId: undefined, tags: undefined };
    const id = (typeof info.id === 'string' || typeof info.id === 'number') ? info.id : undefined;
    const userId = (typeof info.userId === 'string' || typeof info.userId === 'number') ? info.userId : undefined;
    const tags = Array.isArray(info.tags) ? info.tags : undefined;
    return { id, userId, tags };
}
const log = {
    error: (msg, info) => {
        const { id, userId, tags } = extractInfoValues(info);
        globalLogger.error(msg, id, userId, tags);
    },
    warn: (msg, info) => {
        const { id, userId, tags } = extractInfoValues(info);
        globalLogger.warn(msg, id, userId, tags);
    },
    info: (msg, info) => {
        const { id, userId, tags } = extractInfoValues(info);
        globalLogger.info(msg, id, userId, tags);
    },
    debug: (msg, info) => {
        const { id, userId, tags } = extractInfoValues(info);
        globalLogger.debug(msg, id, userId, tags);
    }
};

export { Logger, init, log };
