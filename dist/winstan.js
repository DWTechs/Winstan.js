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
import { isStringOfLength, isProperty, isString, isValidInteger } from '@dwtechs/checkard';

let defaultUser = "";
let defaultService = "";
let defaultLocale = "fr-FR";
let defaultTZ = "europe/paris";
let nodeEnv = "development";
if (process === null || process === void 0 ? void 0 : process.env) {
    const { LOCALE, TZ, NODE_ENV, SERVICE_NAME, SYSTEM_USER_NAME } = process.env;
    defaultLocale = LOCALE || defaultLocale;
    defaultTZ = TZ || defaultTZ;
    nodeEnv = NODE_ENV || nodeEnv;
    defaultService = SERVICE_NAME || defaultService;
    defaultUser = SYSTEM_USER_NAME || defaultUser;
}
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
let displayedLevel = (nodeEnv === "prod" || nodeEnv === "production") ? "info" : "debug";
const tpts = setTransports();
const fmt = init({
    timeZone: defaultTZ,
    locale: defaultLocale,
    service: defaultService,
    level: displayedLevel
});
function setDateFormat(timeZone, locale) {
    const tz = isStringOfLength(timeZone, 2, 999) ? timeZone : defaultTZ;
    const l = isStringOfLength(locale, 5, 5) ? locale : defaultLocale;
    return new Date().toLocaleString(l, { timeZone: tz });
}
function setService(service) {
    return isStringOfLength(service, 1, 99) ? service : defaultService;
}
function setUser(user) {
    return ((isString(user) && isStringOfLength(user, 1, 99)) || isValidInteger(user, 1, 99)) ? `${user} - ` : defaultUser;
}
function setAction(action) {
    return action ? `[${action}] ` : "";
}
function setLevel(lvl) {
    return isProperty(levels, lvl) ? lvl : "debug";
}
function setTransports() {
    return [new winston.transports.Console()];
}
function setFormat(format, service) {
    const snLog = service ? `${service} ` : "";
    return winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format }), winston.format.align(), winston.format.printf((info) => {
        var _a;
        const msg = (_a = info.message) === null || _a === void 0 ? void 0 : _a.toString().replace(/[\n\r]+/g, "").replace(/\s{2,}/g, " ");
        return `[${info.timestamp}] - ${snLog}${info.level}: ${msg}`;
    }));
}
function init(options) {
    displayedLevel = setLevel(options.level);
    const dateFormat = setDateFormat(options.timeZone, options.locale);
    const service = setService(options.service);
    return setFormat(dateFormat, service);
}
const logger = winston.createLogger({
    level: displayedLevel,
    silent: false,
    format: fmt,
    levels,
    transports: tpts
});
winston.addColors(colors);
function normalize(lvl, msg, user, action) {
    if (!isString(msg, "!0"))
        return;
    const u = setUser(user);
    const a = setAction(action);
    const m = `${a}${u}${msg}`;
    logger[lvl](m);
}
const log = {
    error: (msg, user = defaultUser, action = "") => {
        normalize('error', msg, user, action);
    },
    warn: (msg, user = defaultUser, action = "") => {
        normalize('warn', msg, user, action);
    },
    info: (msg, user = defaultUser, action = "") => {
        normalize('info', msg, user, action);
    },
    debug: (msg, user = defaultUser, action = "") => {
        normalize('debug', msg, user, action);
    }
};

export { init, log };
