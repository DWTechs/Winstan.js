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

import { isString, isNumber, isArray } from '@dwtechs/checkard';

function normalizeInfo(info) {
    let m = "";
    for (const key in info) {
        if (key === "message" || key === "level")
            continue;
        const v = info[key];
        if (isString(v, "!0"))
            m += `${key}="${v}" `;
        if (isNumber(v, true, ">", 0))
            m += `${key}=${v} `;
        if (isArray(v, ">", 0))
            m += `${key}="${v.toString()}" `;
    }
    return m;
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
        const now = new Date();
        const date = now.toLocaleDateString(locale, { timeZone: tz });
        const time = now.toLocaleTimeString(locale, { timeZone: tz });
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        return { date, time: `${time}:${ms}` };
    }
    colorize(level, text) {
        if (!this.options.colorize)
            return text;
        return `${this.colors[level]}${text}${this.colors.reset}`;
    }
    formatMessage(entry) {
        var _a;
        const service = this.options.service ? `service="${this.options.service}" ` : "";
        const info = normalizeInfo(entry);
        const { date, time } = entry.timestamp;
        const paddedLevel = entry.level.padEnd(5, ' ');
        const prefix = `${paddedLevel} | date=${date} time=${time} `;
        const indent = ' '.repeat(prefix.length);
        const lines = ((_a = entry.message) === null || _a === void 0 ? void 0 : _a.toString().split(/[\n\r]+/)) || [];
        const formattedLines = lines.map((line, index) => {
            const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
            if (index === 0) {
                return this.colorize(entry.level, `${prefix}${trimmedLine} ${service}${info}`.trim());
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
    log(level, message, info) {
        if (!this.shouldLog(level))
            return;
        const entry = Object.assign({ timestamp: this.formatTimestamp(), level,
            message }, info);
        this.output(entry);
    }
    error(message, info) {
        this.log('error', message, info);
    }
    warn(message, info) {
        this.log('warn', message, info);
    }
    info(message, info) {
        this.log('info', message, info);
    }
    debug(message, info) {
        this.log('debug', message, info);
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
const log = {
    error: (msg, info) => {
        globalLogger.error(msg, info);
    },
    warn: (msg, info) => {
        globalLogger.warn(msg, info);
    },
    info: (msg, info) => {
        globalLogger.info(msg, info);
    },
    debug: (msg, info) => {
        globalLogger.debug(msg, info);
    }
};

export { Logger, init, log };
