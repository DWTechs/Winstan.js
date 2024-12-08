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

'use strict';

/**
 * winston.js: Top-level include defining Winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */


const logform = require('logform');
const { warn } = require('./winston/common');

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */
exports.version = require('../package.json').version;
/**
 * Include transports defined by default by winston
 * @type {Array}
 */
exports.transports = require('./winston/transports');
/**
 * Expose utility methods
 * @type {Object}
 */
exports.config = require('./winston/config');
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
exports.addColors = logform.levels;
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
exports.format = logform.format;
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
exports.createLogger = require('./winston/create-logger');
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
exports.Logger = require('./winston/logger');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.ExceptionHandler = require('./winston/exception-handler');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.RejectionHandler = require('./winston/rejection-handler');
/**
 * Expose core Logging-related prototypes.
 * @type {Container}
 */
exports.Container = require('./winston/container');
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
exports.Transport = require('winston-transport');
/**
 * We create and expose a default `Container` to `winston.loggers` so that the
 * programmer may manage multiple `winston.Logger` instances without any
 * additional overhead.
 * @example
 *   // some-file1.js
 *   const logger = require('winston').loggers.get('something');
 *
 *   // some-file2.js
 *   const logger = require('winston').loggers.get('something');
 */
exports.loggers = new exports.Container();

/**
 * We create and expose a 'defaultLogger' so that the programmer may do the
 * following without the need to create an instance of winston.Logger directly:
 * @example
 *   const winston = require('winston');
 *   winston.log('info', 'some message');
 *   winston.error('some error');
 */
const defaultLogger = exports.createLogger();

// Pass through the target methods onto `winston.
Object.keys(exports.config.npm.levels)
  .concat([
    'log',
    'query',
    'stream',
    'add',
    'remove',
    'clear',
    'profile',
    'startTimer',
    'handleExceptions',
    'unhandleExceptions',
    'handleRejections',
    'unhandleRejections',
    'configure',
    'child'
  ])
  .forEach(
    method => (exports[method] = (...args) => defaultLogger[method](...args))
  );

/**
 * Define getter / setter for the default logger level which need to be exposed
 * by winston.
 * @type {string}
 */
Object.defineProperty(exports, 'level', {
  get() {
    return defaultLogger.level;
  },
  set(val) {
    defaultLogger.level = val;
  }
});

/**
 * Define getter for `exceptions` which replaces `handleExceptions` and
 * `unhandleExceptions`.
 * @type {Object}
 */
Object.defineProperty(exports, 'exceptions', {
  get() {
    return defaultLogger.exceptions;
  }
});

/**
 * Define getter for `rejections` which replaces `handleRejections` and
 * `unhandleRejections`.
 * @type {Object}
 */
Object.defineProperty(exports, 'rejections', {
  get() {
    return defaultLogger.rejections;
  }
});

/**
 * Define getters / setters for appropriate properties of the default logger
 * which need to be exposed by winston.
 * @type {Logger}
 */
['exitOnError'].forEach(prop => {
  Object.defineProperty(exports, prop, {
    get() {
      return defaultLogger[prop];
    },
    set(val) {
      defaultLogger[prop] = val;
    }
  });
});

/**
 * The default transports and exceptionHandlers for the default winston logger.
 * @type {Object}
 */
Object.defineProperty(exports, 'default', {
  get() {
    return {
      exceptionHandlers: defaultLogger.exceptionHandlers,
      rejectionHandlers: defaultLogger.rejectionHandlers,
      transports: defaultLogger.transports
    };
  }
});

// Have friendlier breakage notices for properties that were exposed by default
// on winston < 3.0.
warn.deprecated(exports, 'setLevels');
warn.forFunctions(exports, 'useFormat', ['cli']);
warn.forProperties(exports, 'useFormat', ['padLevels', 'stripColors']);
warn.forFunctions(exports, 'deprecated', [
  'addRewriter',
  'addFilter',
  'clone',
  'extend'
]);
warn.forProperties(exports, 'deprecated', ['emitErrs', 'levelLength']);

/*
MIT License

Copyright (c) 2009 DWTechs

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

https://github.com/DWTechs/Checkard.js
*/

function isString(s, required = false) {
    return typeof s === "string" && (required ? !!s : true);
}

function isArray(a, comp, len) {
    return (a === null || a === void 0 ? void 0 : a.constructor) === Array ? true : false;
}

function isObject(o, empty = false) {
    return o !== null && typeof o === "object" && !isArray(o) && (empty ? !!Object.keys(o).length : true);
}
function isProperty(val, obj) {
    const v = String(val);
    return isString(v, true) && isObject(obj) ? Object.keys(obj).includes(v) : false;
}

function isStringOfLength(s, min = 0, max = 999999999) {
    if (!isString(s, false))
        return false;
    const l = s.length;
    return l >= min && l <= max;
}

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
    return [new undefined.Console()];
}
function setFormat(tz, serviceName) {
    const dateFormat = getFormatDate(tz);
    const sn = setServiceName(serviceName);
    const snLog = sn ? `${sn} ` : "";
    return undefined.combine(undefined.colorize({ all: true }), undefined.timestamp({ format: dateFormat }), undefined.align(), undefined.printf((info) => {
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
    return undefined({
        level: lvl,
        silent: false,
        format: fmt,
        levels,
        transports: tpts
    });
};

exports.init = init;
exports.log = log;
