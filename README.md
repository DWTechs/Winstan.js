
[![License: MIT](https://img.shields.io/npm/l/@dwtechs/winstan.svg?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40dwtechs%2Fwinstan.svg)](https://www.npmjs.com/package/@dwtechs/winstan)
[![last version release date](https://img.shields.io/github/release-date/DWTechs/Winstan.js)](https://www.npmjs.com/package/@dwtechs/winstan)
[![minified size](https://img.shields.io/bundlephobia/min/@dwtechs/winstan?color=brightgreen)](https://www.npmjs.com/package/@dwtechs/winstan)

- [Synopsis](#synopsis)
- [Support](#support)
- [Installation](#installation)
- [Usage](#usage)
  - [ES6](#es6)
- [Configure](#configure)
- [API Reference](#api-reference)
- [Contributors](#contributors)
- [Stack](#stack)


## Synopsis

**[Winstan.js](https://github.com/DWTechs/Winstan.js)** is an Open source Winston setup wrapper library for easier logging with less code.

- Only 1 small dependency to check inputs variables
- Very lightweight
- Thoroughly tested
- Works in Javascript and Typescript
- Can be used as EcmaScrypt module
- Written in Typescript


## Support

- node: 22

This is the oldest targeted versions. The library should work properly on older versions of Node.js but we do not support it officially.  


## Installation

```bash
$ npm i @dwtechs/winstan
```


## Usage


### ES6 / TypeScript

```javascript
import { log } from "@dwtechs/winstan";

log.error(`App cannot start: ${err.msg}`);
log.info(`App started on port : ${PORT}`);
log.debug(`Update one(user=${JSON.stringify(users)})`, { user: "admin", tags: ["user", "update"] });

```


### Levels

Winstan uses four log levels : 
  - error,
  - warn,
  - info,
  - debug


## Configure

Winstan will start with the following default configuration : 

```Javascript
  let locale = "fr-FR";
  let timeZone = "europe/paris";
  let level = "debug";
```

**DefaultService** is the service name. (Or the application name)
If provided, it will appear at the beginning of every log.
It is useful in a multi-service or multi-application monitoring tool.

**defaultUser** is the user name or id.
If provided, it will appear in the message of the log.
It is useful to know who made the action in a monitoring tool.

You can configure Winstan using 2 methods :

### Environment variables

Four environment variables may be used by Winstan : 

example :

```bash
  LOCALE="en-EN"
  TZ="UTC"
  NODE_ENV="production"
  SERVICE_NAME="ms_user"
```

These environment variables will update the default values of the lib at start up.
So you do not need to init the library in the code.

```javascript

import { log } from "@dwtechs/winstan";

log.info(`App started on port : ${PORT}`, { user: "System" });

```

**TZ** is the timezone configuration to set time to your region.

### init() method

This method will override ENV variables.

```javascript

import { log, init } from "@dwtechs/winstan";

init( "UTC", "fr-FR", "ms_user", "debug" );
log.info(`App started on port : ${PORT}`);

```

### Production mode

Possible values for **NODE_ENV** environment variable are "production" and "prod".
Those values will set Winstan log level to **info**.
Any other value (like "dev" or "development") will set the log level to **debug**


## API Reference


```javascript

export type Levels = 'error'|'warn'|'info'|'debug';

function init(
  timeZone: string | undefined, // timezone for date and time. Default to europe/paris
  locale: string | undefined, // locale for date and time. Default to fr-FR
  service: string | undefined, // service name. Default to empty string
  level: Levels // minimum level to log. default to debug): Logform.Format;
): void;


const log: {
  error: (msg: string, info?: Info) => void,
  warn: (msg: string, info?: Info) => void,
  info: (msg: string, info?: Info) => void,
  debug: (msg: string, info?: Info) => void,
};

```

### Info

You can use this object to add more information to the log like IDs, tags, etc.

```javascript
  log.debug(`Add user(user=${JSON.stringify(users)})`, { user: userId, tags: ["addUser"] });
```

## Express.js plugins

Winstan comes with utility plugins for Express.js.

### winstan-plugin-express-perf

Performances measurement plugin for Express.js.
This plugin will log the time it took to process a request.

[https://www.npmjs.com/package/@dwtechs/winstan-plugin-express-perf](https://www.npmjs.com/package/@dwtechs/winstan-plugin-express-perf)


## Contributors

Winstan.js is still in development and we would be glad to get all the help you can provide.
To contribute please read **[contributor.md](https://github.com/DWTechs/Winstan.js/blob/main/contributor.md)** for detailed installation guide.


## Stack

| Purpose         |                    Choice                    |                                                     Motivation |
| :-------------- | :------------------------------------------: | -------------------------------------------------------------: |
| repository      |        [Github](https://github.com/)         |     hosting for software development version control using Git |
| package manager |     [npm](https://www.npmjs.com/get-npm)     |                                default node.js package manager |
| language        | [TypeScript](https://www.typescriptlang.org) | static type checking along with the latest ECMAScript features |
| module bundler  |      [Rollup](https://rollupjs.org)          |                        advanced module bundler for ES6 modules |
| unit testing    |          [Jest](https://jestjs.io/)          |                  delightful testing with a focus on simplicity |
