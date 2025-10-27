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

import { isProperty, isString, isNumber, isArray, isObject, isAnsiEscapeCode, isLocale, isTimeZone, isStringOfLength } from '@dwtechs/checkard';

var _a$4;
const { NODE_ENV: NODE_ENV$1 } = (_a$4 = process === null || process === void 0 ? void 0 : process.env) !== null && _a$4 !== void 0 ? _a$4 : null;
const dev = "debug";
const prod = "info";
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
let level = dev;
function setLevel(lvl) {
    level = isProperty(levels, lvl) ? lvl : level;
    return level;
}
function shouldLog(lev) {
    return levels[lev] <= levels[level];
}
setLevel((NODE_ENV$1 === "prod" || NODE_ENV$1 === "production") ? prod : dev);

function formatTxt(value) {
    if (isString(value)) {
        const escaped = value
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
        if (/[\s"'=\\]/.test(escaped)) {
            return `"${escaped}"`;
        }
        return escaped;
    }
    else if (isNumber(value)) {
        return value.toString();
    }
    else if (isArray(value)) {
        const items = value.map(item => isString(item) ? `"${item.toString().replace(/"/g, '\\"')}"` : item.toString());
        return `[${items.join(',')}]`;
    }
    return String(value);
}

function formatMisc(ctx) {
    let m = "";
    for (const key in ctx) {
        if (key === "message" || key === "level")
            continue;
        const v = ctx[key];
        if (isString(v, "!0") || isNumber(v, false) || isArray(v, ">", 0))
            m += `${key}=${formatTxt(v)} `;
    }
    return m.trim();
}

const colors = {
    error: '\x1b[31m',
    warn: '\x1b[33m',
    info: '\x1b[34m',
    debug: '\x1b[32m',
};
function getColor(level) {
    return colors[level] || '';
}
function setColors(newColors) {
    if (isObject(newColors)) {
        for (const key in newColors) {
            const l = key;
            const v = newColors[l];
            if (isProperty(colors, l) && isAnsiEscapeCode(v))
                colors[l] = v;
        }
    }
    return colors;
}

var _a$3;
const { COLORIZE, NODE_ENV } = (_a$3 = process === null || process === void 0 ? void 0 : process.env) !== null && _a$3 !== void 0 ? _a$3 : null;
let colorize;
if (COLORIZE !== undefined)
    colorize = COLORIZE !== "false" && COLORIZE !== "0";
else {
    const isProd = NODE_ENV === "production" || NODE_ENV === "prod";
    colorize = !isProd;
}
const reset = '\x1b[0m';
function formatColor(level, text) {
    if (!colorize)
        return text;
    return `${getColor(level)}${text}${reset}`;
}
function setColorize(clr) {
    colorize = clr;
    return colorize;
}

var _a$2;
const { LOCALE } = (_a$2 = process === null || process === void 0 ? void 0 : process.env) !== null && _a$2 !== void 0 ? _a$2 : null;
const def = 'fr-FR';
let locale = isLocale(LOCALE) ? LOCALE : def;
function setLocale(loc) {
    if (isLocale(loc))
        locale = loc;
    return locale;
}

var _a$1;
const { TZ } = (_a$1 = process === null || process === void 0 ? void 0 : process.env) !== null && _a$1 !== void 0 ? _a$1 : null;
const dTimeZone = 'Europe/Paris';
let timeZone = isTimeZone(TZ) ? TZ : dTimeZone;
function setTimeZone(tz) {
    if (isTimeZone(tz))
        timeZone = tz;
    return timeZone;
}

function formatDate() {
    const now = new Date();
    const date = now.toLocaleDateString(locale, { timeZone });
    const time = now.toLocaleTimeString(locale, { timeZone });
    const ms = now.getMilliseconds().toString().padStart(3, '0');
    return `time=${date} ${time}:${ms}`;
}

var _a;
const { SERVICE_NAME } = (_a = process === null || process === void 0 ? void 0 : process.env) !== null && _a !== void 0 ? _a : null;
let service = "";
function setService(srv) {
    if (isStringOfLength(srv, 1, 99))
        service = srv;
    return service;
}
function getService() {
    return service;
}
setService(SERVICE_NAME);

function formatService() {
    const service = getService();
    return service ? `service=${formatTxt(service)}` : "";
}

function msg(lvl, txt, ctx) {
    var _a, _b;
    const ts = formatDate();
    const misc = formatMisc(ctx);
    const service = formatService();
    const l = `level=${lvl}`;
    const isProduction = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "production" || ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === "prod";
    if (isProduction) {
        let logfmtLine = `${ts} ${l}`;
        if (service)
            logfmtLine += ` ${service}`;
        if (misc)
            logfmtLine += ` ${misc}`;
        const formattedTxt = formatTxt(txt);
        logfmtLine += ` msg=${formattedTxt}`;
        return formatColor(lvl, logfmtLine);
    }
    const lines = (txt === null || txt === void 0 ? void 0 : txt.toString().split(/[\n\r]+/)) || [];
    if (lines.length > 1) {
        let result = '';
        lines.forEach((line, i) => {
            const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
            if (i === 0) {
                let firstLine = `${ts} ${l}`;
                if (service)
                    firstLine += ` ${service}`;
                if (misc)
                    firstLine += ` ${misc}`;
                firstLine += ` msg=${formatTxt(trimmedLine)}`;
                result += formatColor(lvl, firstLine);
            }
            else {
                result += '\n' + formatColor(lvl, `  ${trimmedLine}`);
            }
        });
        return result;
    }
    let logfmtLine = `${ts} ${l}`;
    if (service)
        logfmtLine += ` ${service}`;
    if (misc)
        logfmtLine += ` ${misc}`;
    const formattedTxt = formatTxt(txt);
    logfmtLine += ` msg=${formattedTxt}`;
    return formatColor(lvl, logfmtLine);
}
function print(lvl, txt, ctx) {
    if (!shouldLog(lvl))
        return;
    if (!isString(txt, "!0"))
        return;
    const m = msg(lvl, txt, ctx || {});
    if (lvl === 'error')
        console.error(m);
    else if (lvl === 'warn')
        console.warn(m);
    else
        console.log(m);
}
const log = {
    error: (txt, ctx) => {
        print('error', txt, ctx);
    },
    warn: (txt, ctx) => {
        print('warn', txt, ctx);
    },
    info: (txt, ctx) => {
        print('info', txt, ctx);
    },
    debug: (txt, ctx) => {
        print('debug', txt, ctx);
    }
};

export { log, setColorize, setColors, setLevel, setLocale, setService, setTimeZone };
