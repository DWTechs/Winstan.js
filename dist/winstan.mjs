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

import * as winston from 'winston';
import { isStringOfLength, isProperty } from '@dwtechs/checkard';

let defaultSN = "serviceName";
let defaultLocale = "fr-FR";
let defaultTZ = "europe/paris";
let defaultNodeEnv = "development";
if (process === null || process === void 0 ? void 0 : process.env) {
    const { LOCALE, TZ, NODE_ENV, SERVICE_NAME } = process.env;
    defaultLocale = LOCALE || defaultLocale;
    defaultTZ = TZ || defaultTZ;
    defaultNodeEnv = NODE_ENV || defaultNodeEnv;
    defaultSN = SERVICE_NAME || defaultSN;
}
const defaultLvl = (defaultNodeEnv === "prod" || defaultNodeEnv === "production") ? "info" : "debug";
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
let lvl = defaultLvl;
let fmt = setFormat(defaultTZ, "serviceName");
const tpts = setTransports();
function getTimezonedDate(timeZone) {
    return new Date().toLocaleString(defaultLocale, { timeZone });
}
function getFormatDate(timeZone) {
    return isStringOfLength(timeZone, 2, 999) ? getTimezonedDate(timeZone) : getTimezonedDate(defaultTZ);
}
function setServiceName(serviceName) {
    return isStringOfLength(serviceName, 1, 999) ? serviceName : defaultSN;
}
function setTransports() {
    return [new winston.transports.Console()];
}
function setFormat(tz, serviceName) {
    const dateFormat = getFormatDate(tz);
    const sn = setServiceName(serviceName);
    const snLog = sn ? `${sn} ` : "";
    return winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: dateFormat }), winston.format.align(), winston.format.printf((info) => {
        var _a;
        const msg = (_a = info.message) === null || _a === void 0 ? void 0 : _a.toString().replace(/[\n\r]+/g, "").replace(/\s{2,}/g, " ");
        return `[${info.timestamp}] - ${snLog}${info.level}: ${msg}`;
    }));
}
function init(timeZone, serviceName, level) {
    lvl = isProperty(level, levels) ? level : lvl;
    fmt = setFormat(timeZone, serviceName);
}
const log = () => {
    return winston.createLogger({
        level: lvl,
        silent: false,
        format: fmt,
        levels,
        transports: tpts
    });
};

export { init, log };
