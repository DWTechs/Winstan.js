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
import { isProperty, isStringOfLength } from '@dwtechs/checkard';

let defaultSN = "";
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
const colors = {
    error: "red",
    warn: "orange",
    info: "blue",
    debug: "green",
};
let lvl = defaultLvl;
const tpts = setTransports();
let fmt = init({ timeZone: defaultTZ,
    locale: defaultLocale,
    serviceName: defaultSN,
    level: defaultLvl
});
function setDateFormat(timeZone, locale) {
    timeZone = isStringOfLength(timeZone, 2, 999) ? timeZone : defaultTZ;
    locale = isStringOfLength(locale, 5, 5) ? locale : defaultLocale;
    return new Date().toLocaleString(locale, { timeZone });
}
function setServiceName(serviceName) {
    return isStringOfLength(serviceName, 1, 999) ? serviceName : defaultSN;
}
function setTransports() {
    return [new winston.transports.Console()];
}
function setFormat(format, serviceName) {
    const snLog = serviceName ? `${serviceName} ` : "";
    return winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format }), winston.format.align(), winston.format.printf((info) => {
        var _a;
        const msg = (_a = info.message) === null || _a === void 0 ? void 0 : _a.toString().replace(/[\n\r]+/g, "").replace(/\s{2,}/g, " ");
        return `[${info.timestamp}] - ${snLog}${info.level}: ${msg}`;
    }));
}
function init(options) {
    lvl = isProperty(options.level, levels) ? options.level : lvl;
    const dateFormat = setDateFormat(options.timeZone, options.locale);
    const sn = setServiceName(options.serviceName);
    return setFormat(dateFormat, sn);
}
const log = winston.createLogger({
    level: lvl,
    silent: false,
    format: fmt,
    levels,
    transports: tpts
});
winston.addColors(colors);

export { init, log };
