
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

#### Basic Usage

```javascript
import { log } from "@dwtechs/winstan";

// Simple error logging
log.error(`App cannot start: ${err.msg}`);

// Info with basic context
log.info(
  `App started on port : ${PORT}`, 
  { user: "System" }
);

// Debug with multiple context values
log.debug(
  `Update one(user=${JSON.stringify(users)})`, 
  { user: "admin", tags: ["user", "update"] }
);
```

#### Advanced Examples with Context Values

```javascript
import { log } from "@dwtechs/winstan";

// Authentication logging with user context
log.info("User login successful", {
  userId: "12345",
  email: "user@example.com",
  loginMethod: "password",
  ipAddress: "192.168.1.100",
  tags: ["auth", "login"]
});

// Database operation logging
log.debug("Database query executed", {
  operation: "SELECT",
  table: "users",
  executionTime: 45,
  rowsReturned: 150,
  queryId: "q_789",
  tags: ["database", "performance"]
});

// API request logging
log.info("API request processed", {
  method: "POST",
  endpoint: "/api/users",
  statusCode: 201,
  responseTime: 125,
  requestId: "req_abc123",
  clientId: "client_456",
  tags: ["api", "request"]
});

// Error logging with detailed context
log.error("Payment processing failed", {
  orderId: "order_789",
  userId: "user_456",
  amount: 99.99,
  currency: "EUR",
  paymentMethod: "credit_card",
  errorCode: "INSUFFICIENT_FUNDS",
  transactionId: "tx_def456",
  tags: ["payment", "error", "transaction"]
});

// Warning with system metrics
log.warn("High memory usage detected", {
  memoryUsage: 85.7,
  threshold: 80,
  processId: 1234,
  service: "api-server",
  alertLevel: "medium",
  tags: ["system", "memory", "alert"]
});

// Business logic logging
log.debug("Order processing workflow", {
  orderId: "order_123",
  step: "inventory_check",
  stepNumber: 3,
  totalSteps: 8,
  processingTime: 234,
  workflowId: "wf_789",
  tags: ["workflow", "order", "inventory"]
});

// Multi-service communication
log.info("External service called", {
  serviceName: "payment-gateway",
  endpoint: "https://api.payment.com/charge",
  method: "POST",
  responseCode: 200,
  responseTime: 1250,
  correlationId: "corr_xyz789",
  tags: ["external", "payment", "integration"]
});
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
  let serviceName = "";
```
- **level** is the log level to display.  
- **locale** is the locale configuration to set date and time to your region.  
- **timeZone** is the timezone configuration to set time to your region.  
- **serviceName** is the service name. (Or the application name)  
If provided, it will appear in every log.  
It is useful in a multi-service or multi-application monitoring tool.

You can configure Winstan using 2 methods :

### Environment variables
--- 

Four environment variables may be used by Winstan : 

example :

```bash
  LOCALE="en-EN"
  TZ="UTC"
  NODE_ENV="production"
  SERVICE_NAME="ms_user"
```

- if **NODE_ENV** is set to "production" or "prod", the log level will be set to **info**.  
If it is set to any other value, the log level will be set to **debug**.  

- **LOCALE** is the locale configuration to set date and time to your region.  

- **TZ** is the timezone configuration to set time to your region.  

- **SERVICE_NAME** is the service name. (Or the application name)  
If provided, it will appear in every log.  
It is useful in a multi-service or multi-application monitoring tool.  

These environment variables will update the default values of the lib at start up.
So you do not need to init the library in the code.

### init() method
---

This method will override ENV variables.

```javascript

import { log, init } from "@dwtechs/winstan";

init( "UTC", "fr-FR", "ms_user", "debug" );
log.info(`App started on port : ${PORT}`);

```

### Log Formatting Modes
---

Winstan automatically adapts its log formatting based on the environment:

#### Development Mode (Default)
- **When**: Any `NODE_ENV` value except "production" or "prod"
- **Format**: Human-readable multiline logs with proper indentation
- **Log Level**: `debug` (shows all log levels)
- **Multiline Handling**: Indented continuation lines for better readability

**Example output:**
```
debug | Multi-line message
      | continues here with proper indentation
      | for better readability
```

#### Production Mode
- **When**: `NODE_ENV=production` or `NODE_ENV=prod`
- **Format**: Pure logfmt format with escaped newlines (single-line entries)
- **Log Level**: `info` (hides debug logs for performance)
- **Multiline Handling**: Escaped newlines within single logfmt entries

**Example output:**
```
level=info msg="Multi-line message\ncontinues here\nall on one line" service="my-app"
```

This dual formatting approach ensures:
- **Development**: Maximum readability for debugging
- **Production**: Structured logging compatible with log aggregators and monitoring tools


## API Reference


```javascript

export type Levels = 'error'|'warn'|'info'|'debug';

/**
 * Initializes the logging configuration.
 *
 * @param timeZone - The time zone to be used for logging timestamps. If undefined, the default time zone will be used.
 * @param locale - The locale to be used for formatting dates. If undefined, the default locale will be used.
 * @param service - The name of the service for which the logging is being configured. If undefined, a default service name will be used.
 * @param level - The logging level to be set. This determines the severity of logs that will be captured.
 * 
 * @returns void
 */
function init(
  timeZone: string | undefined, // timezone for date and time. Default to europe/paris
  locale: string | undefined, // locale for date and time. Default to fr-FR
  service: string | undefined, // service name. Default to empty string
  level: Levels // minimum level to log. default to debug): Logform.Format;
): void;

const log: {
  error: (
    msg: string, 
    info?: Record<string, string | number | string[] | number[]>
  ): void => {},
  warn: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ): void => {},
  info: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ): void => {},
  debug: (
    msg: string,
    info?: Record<string, string | number | string[] | number[]>
  ): void => {},
};

```

### Info parameter
---

You can use this object to add more information to the log like IDs, tags, etc.

```javascript
  log.debug(
    `Add user(user=${JSON.stringify(users)})`, 
    { user: userId, tags: ["addUser"] }
  );
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
