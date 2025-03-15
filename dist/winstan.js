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

function normalizeId(id) {
    return (isString(id, "!0") || isNumber(id, true, ">", 0)) ? `id=${id} - ` : "";
}
function normalizeUser(user) {
    return (isString(user, "!0") || isNumber(user, true, ">", 0)) ? `userId=${user} - ` : "";
}
function normalizeTags(tags) {
    return isArray(tags, ">", 0) ? `tags=[${tags.toString()}] - ` : "";
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
    const sn = service ? `${service} ` : "";
    format = winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: dateFormat }), winston.format.align(), winston.format.printf((info) => {
        var _a;
        const msg = (_a = info.message) === null || _a === void 0 ? void 0 : _a.toString().replace(/[\n\r]+/g, "").replace(/\s{2,}/g, " ");
        const i = normalizeId(info.id);
        const u = normalizeUser(info.userId);
        const t = normalizeTags(info.tags);
        return `${info.timestamp} - ${sn}${i}${u}${t}${info.level}: ${msg}`;
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
function print(lvl, msg, infos) {
    if (!isString(msg, "!0"))
        return;
    logger[lvl](msg, infos);
}
const log = {
    error: (msg, infos) => {
        print('error', msg, infos);
    },
    warn: (msg, infos) => {
        print('warn', msg, infos);
    },
    info: (msg, infos) => {
        print('info', msg, infos);
    },
    debug: (msg, infos) => {
        print('debug', msg, infos);
    }
};

export { init, log };
