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

import winston from 'winston';
import { isString, isNumber, isArray, isStringOfLength, isProperty } from '@dwtechs/checkard';

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

let format;
function setDateFormat(timeZone, locale) {
    const tz = (isString(timeZone) && isStringOfLength(timeZone, 2, 999)) ? timeZone : "europe/paris";
    const l = (isString(locale) && isStringOfLength(locale, 5, 5)) ? locale : "fr-FR";
    return new Date().toLocaleString(l, { timeZone: tz });
}
function setService(service) {
    return (isString(service) && isStringOfLength(service, 1, 99)) ? service : "";
}
function setTransports() {
    return [new winston.transports.Console()];
}
function setFormat(dateFormat, service) {
    const sn = service ? `service="${service}" ` : "";
    format = winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: dateFormat }), winston.format.align(), winston.format.printf((info) => {
        var _a, _b;
        const msg = (_b = (_a = info.message) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
        const i = normalizeInfo(info);
        if (msg.includes('\n')) {
            const lines = msg.split('\n');
            return lines
                .map((line, idx) => idx === 0
                ? `${info.level} | ${line.trim()} ${sn}${i}`.trim()
                : `${' '.repeat(info.level.length)} | ${line.trim()}`)
                .join('\n');
        }
        else {
            const cleanMsg = msg.replace(/\s{2,}/g, " ").trim();
            return `${info.level} | ${cleanMsg} ${sn}${i}`;
        }
    }));
}
function getFormat() {
    return format;
}

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
let level = "debug";
function getLevels() {
    return levels;
}
function getLevel() {
    return level;
}
function setLevel(lvl) {
    level = isProperty(levels, lvl) ? lvl : level;
    return level;
}

var _a;
let logger;
function init(timeZone, locale, service, level) {
    const dateFormat = setDateFormat(timeZone, locale);
    const s = setService(service);
    setLevel(level);
    setFormat(dateFormat, s);
    logger = winston.createLogger({
        level: getLevel(),
        silent: false,
        format: getFormat(),
        levels: getLevels(),
        transports: setTransports()
    });
}
const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = (_a = process === null || process === void 0 ? void 0 : process.env) !== null && _a !== void 0 ? _a : null;
setLevel((NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug");
init(TZ, LOCALE, SERVICE_NAME, getLevel());
function print(lvl, msg, info) {
    if (!isString(msg, "!0"))
        return;
    logger[lvl](msg, info);
}
const log = {
    error: (msg, info) => {
        print('error', msg, info);
    },
    warn: (msg, info) => {
        print('warn', msg, info);
    },
    info: (msg, info) => {
        print('info', msg, info);
    },
    debug: (msg, info) => {
        print('debug', msg, info);
    }
};

export { init, log };
