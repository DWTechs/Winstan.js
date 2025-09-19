
[![License: MIT](https://img.shields.io/npm/l/@dwtechs/winstan.svg?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40dwtechs%2Fwinstan.svg)](https://www.npmjs.com/package/@dwtechs/winstan)
[![last version release date](https://img.shields.io/github/release-date/DWTechs/Winstan.js)](https://www.npmjs.com/package/@dwtechs/winstan)

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

**[Winstan.js](https://github.com/DWTechs/Winstan.js)** is an open source log library for easy and lightweight logging.

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
log.debug(`UpdateOne(user=${JSON.stringify(users)})`);

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

log.info(`App started on port : ${PORT}`);

```

**TZ** is the timezone configuration to set time to your region.

### init() method

This method will override ENV variables.

```javascript

import { log, init } from "@dwtechs/winstan";

init( 
  timeZone: "UTC",
  locale: "fr-FR",
  service: "ms_user",
  level: "debug"
);
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
  timeZone: string, // timezone for date and time. Default to europe/paris
  locale: string, // locale for date and time. Default to fr-FR
  service: string, // service name. Default to empty string
  level: Levels // minimum level to log. default to debug): Logform.Format;
): Logform.Format;

const log: {
  error: (
    msg: string,
    id?: string | number | undefined,
    user?: string | number | undefined,
    tag?: string | undefined
  ) => void;
  warn: (
    msg: string,
    id?: string | number | undefined,
    user?: string | number | undefined,
    tag?: string | undefined
  ) => void;
  info: (
    msg: string,
    id?: string | number | undefined,
    user?: string | number | undefined,
    tag?: string | undefined
  ) => void;
  debug: (
    msg: string,
    id?: string | number | undefined,
    user?: string | number | undefined,
    tag?: string | undefined
  ) => void;
};

```

### Id

IDs are often used to uniquely identify requests, sessions, or other entities. Displaying IDs in logs helps in tracing and debugging by providing a way to correlate log entries with specific entities or events.

### User

User is the name or id of the user who made the action. It is optional and can be used to filter logs in a monitoring tool.

### Tags

Tags are a way to categorize logs. They are optional and can be used to filter logs in a monitoring tool.
They can be used categorize logs by action, by module, etc.


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
