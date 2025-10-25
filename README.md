
[![License: MIT](https://img.shields.io/npm/l/@dwtechs/winstan.svg?color=brightgreen)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40dwtechs%2Fwinstan.svg)](https://www.npmjs.com/package/@dwtechs/winstan)
[![last version release date](https://img.shields.io/github/release-date/DWTechs/Winstan.js)](https://www.npmjs.com/package/@dwtechs/winstan)

- [Synopsis](#synopsis)
- [Support](#support)
- [Installation](#installation)
- [Usage](#usage)
- [Configure](#configure)
- [API Reference](#api-reference)
- [Contributors](#contributors)
- [Stack](#stack)


## Synopsis

**[Winstan.js](https://github.com/DWTechs/Winstan.js)** is an open source log library for Node.js for easy and lightweight logging.

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
  let level = "debug"; // info in production mode
  let serviceName = "";
  let colorize = true; // false in production mode
```

You can configure Winstan using 2 methods :

### Environment variables
--- 

Five environment variables may be used by Winstan : 

example :

```bash
  LOCALE="en-EN"
  TZ="UTC"
  NODE_ENV="production"
  SERVICE_NAME="ms_user"
  COLORIZE="false"
```

- if **NODE_ENV** is set to "production" or "prod", the log level will be set to **info**.  
If it is set to any other value, the log level will be set to **debug**.  

- **LOCALE** is the locale configuration to set date and time to your region.  

- **TZ** is the timezone configuration to set time to your region.  

- **SERVICE_NAME** is the name of the service. (Or the application name)  
If provided, it will appear in every log.  
It is useful in a multi-service or multi-application monitoring tool.  

- **COLORIZE** controls whether log output includes ANSI color codes.  
Set to "false" or "0" to disable colors, or "true" or "1" to enable colors.  
If not set, colors are automatically enabled in development mode and disabled in production mode.  
This provides optimal defaults while allowing manual override when needed.  

These environment variables will update the default values of the lib at start up.
So you do not need to init the library in the code.

### Runtime Configuration Methods
---

Winstan provides several methods to configure settings at runtime, which will override both default values and environment variables:

```javascript
import { 
  log, 
  setLevel, 
  setColors, 
  setColorize,
  setLocale, 
  setTimeZone, 
  setService 
} from "@dwtechs/winstan";

// Configure log level
setLevel("info");  // Only show info, warn, and error messages

// Configure custom colors for different log levels
setColors({
  error: '\x1b[91m',  // Bright red
  warn: '\x1b[93m',   // Bright yellow
  info: '\x1b[96m',   // Bright cyan
  debug: '\x1b[95m'   // Bright magenta
});

// Enable/disable colorization
setColorize(false);  // Disable colors for file output

// Configure locale for timestamp formatting
setLocale("en-US");  // US English date format

// Configure timezone for timestamps
setTimeZone("UTC");  // Use UTC timezone

// Set service name for all logs
setService("user-api");  // Will appear as service=user-api in logs

// Start logging with custom configuration
log.info("Application started with custom settings");
```

**Key Features:**
- **Runtime Override**: These methods override environment variables and defaults
- **Immediate Effect**: Changes apply to all subsequent log calls
- **Return Values**: All methods return the current value for confirmation
- **Validation**: Invalid inputs are ignored, current settings remain unchanged
- **Flexible Timing**: Can be called at any time during application lifecycle

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

export type Level = 'error'|'warn'|'info'|'debug';

/**
 * Main logging interface providing structured logging with logfmt output format.
 * Supports four log levels with environment-based formatting and contextual information.
 * 
 * @namespace log
 * 
 * @description
 * The log object provides methods for different severity levels:
 * - error: Critical errors that need immediate attention
 * - warn: Warning conditions that should be noted
 * - info: General information messages  
 * - debug: Detailed information for debugging
 * 
 * Features:
 * - Environment-based formatting (development: multiline, production: escaped)
 * - Automatic timestamp inclusion with configurable timezone
 * - Service name integration when configured
 * - Context fields for structured logging
 * - Level-based filtering and colored output
 * - Logfmt compliance for log aggregation systems
 * 
 * @example
 * // Basic logging
 * log.info('Application started');
 * log.error('Database connection failed');
 * log.warn('Memory usage high');
 * log.debug('Processing user request');
 * 
 * @example
 * // Logging with context
 * log.info('User logged in', { 
 *   userId: 12345, 
 *   email: 'user@example.com',
 *   ip: '192.168.1.100'
 * });
 * 
 * @example
 * // Error logging with stack trace context
 * log.error('Payment processing failed', {
 *   orderId: 'ORD-123',
 *   amount: 99.99,
 *   errorCode: 'CARD_DECLINED'
 * });
 * 
 * @example
 * // Development output (multiline for readability):
 * // 2023-12-25T10:30:45.123+01:00 level=info service=user-api userId=12345 msg="User logged in"
 * 
 * @example
 * // Production output (escaped newlines):
 * // 2023-12-25T09:30:45.123Z level=info service=user-api userId=12345 msg="User logged in"
 */
const log: {
  /**
   * Logs error messages for critical issues requiring immediate attention.
   * Uses console.error() for output and appears in red when colors are enabled.
   * 
   * @param {string} txt - The error message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.error('Database connection timeout');
   * log.error('Authentication failed', { userId: 123, reason: 'invalid_token' });
   */
  error: (
    txt: string, 
    ctx?: Record<string, string | number | string[] | number[]>
  ): void => {},
  /**
   * Logs warning messages for conditions that should be noted but don't require immediate action.
   * Uses console.warn() for output and appears in yellow when colors are enabled.
   * 
   * @param {string} txt - The warning message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.warn('API rate limit approaching');
   * log.warn('Deprecated function used', { function: 'oldMethod', caller: 'userService' });
   */
  warn: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>
  ): void => {},
  /**
   * Logs informational messages for general application events.
   * Uses console.log() for output and appears in blue when colors are enabled.
   * 
   * @param {string} txt - The information message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.info('Server started on port 3000');
   * log.info('User action completed', { action: 'purchase', userId: 456, amount: 29.99 });
   */
  info: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>
  ): void => {},
  /**
   * Logs debug messages for detailed information useful during development and troubleshooting.
   * Uses console.log() for output and appears in green when colors are enabled.
   * Only shown when log level is set to 'debug'.
   * 
   * @param {string} txt - The debug message to log
   * @param {Record<string, string | number | string[] | number[]>} [ctx] - Optional context object with additional fields
   * 
   * @example
   * log.debug('Cache miss for key', { key: 'user:123', ttl: 300 });
   * log.debug('SQL query executed', { query: 'SELECT * FROM users', duration: '15ms' });
   */
  debug: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>
  ): void => {},
};


/**
 * Sets custom ANSI color codes for different log levels.
 * Only updates colors for valid log levels with valid ANSI escape codes.
 * 
 * @param {Partial<Record<Level, string>> | null} newColors - Object containing custom color mappings for log levels.
 *   - Can be a partial object with any combination of 'error', 'warn', 'info', 'debug' keys
 *   - Each value must be a valid ANSI escape code (e.g., '\x1b[31m' for red)
 *   - Pass null to skip color updates
 *   - Invalid objects, invalid log levels, or invalid ANSI codes are silently ignored
 * 
 * @returns {void}
 * 
 * @example
 * // Set custom colors for error and warning levels
 * setColors({
 *   error: '\x1b[91m',  // Bright red
 *   warn: '\x1b[93m'    // Bright yellow
 * });
 * 
 * @example
 * // Set all colors at once
 * setColors({
 *   error: '\x1b[31m',  // Red
 *   warn: '\x1b[33m',   // Yellow
 *   info: '\x1b[36m',   // Cyan
 *   debug: '\x1b[35m'   // Magenta
 * });
 * 
 * @example
 * // Invalid calls are safely ignored
 * setColors(null);           // No-op
 * setColors("invalid");      // Ignored - not an object
 * setColors({ invalid: '\x1b[31m' }); // Ignored - invalid level
 * setColors({ error: 'red' });        // Ignored - invalid ANSI code
 */
function setColors(newColors: Partial<Record<Level, string>> | null): void {}

/**
 * Sets the service name to be included in log messages.
 * The service name appears as a 'service' field in logfmt output when set.
 * 
 * @param {string | undefined} srv - The service name to set
 *   - Must be a non-empty string between 1 and 99 characters in length
 *   - Can contain spaces, letters, numbers, and special characters
 *   - Pass undefined, null, empty string, or invalid length to keep current service unchanged
 *   - Service names with spaces will be properly quoted in logfmt output
 * 
 * @returns {string} The current service name after the operation.
 *   - If the provided service name is valid, returns the new service name
 *   - If the provided service name is invalid, returns the unchanged current service name
 *   - Returns empty string if no service has been set
 * 
 * @example
 * // Set a simple service name
 * setService('user-api');
 * console.log(getService()); // 'user-api'
 * // Log output: level=info service=user-api msg="User logged in"
 * 
 * @example
 * // Set a service name with spaces (will be quoted in output)
 * setService('My Web Service v2.1');
 * // Log output: level=info service="My Web Service v2.1" msg="Request processed"
 * 
 * @example
 * // Set microservice name
 * setService('payment-processor');
 * 
 * @example
 * // Invalid inputs are ignored
 * const current = getService();
 * setService(''); // Too short - ignored
 * setService('a'.repeat(100)); // Too long - ignored  
 * setService(undefined); // Invalid - ignored
 * console.log(getService() === current); // true - unchanged
 * 
 * @example
 * // Clear service name (set to empty)
 * setService('valid-service'); // Set first
 * // To clear, you need to set a new valid short name or use environment variable
 * 
 * @example
 * // Typical usage in application startup
 * setService('order-service');
 * // All subsequent logs will include: service=order-service
 */
declare function setService(srv: string | undefined): string {}

/**
 * Sets the timezone for date and time formatting in log messages.
 * Used to control the timezone of timestamps displayed in log output.
 * 
 * @param {string} tz - The timezone identifier to set
 *   - Must be a valid IANA timezone identifier (e.g., 'America/New_York', 'Europe/London')
 *   - Examples include: 'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'
 *   - Invalid timezone identifiers are ignored and the current timezone remains unchanged
 *   - Case-sensitive: must match exact IANA timezone database entries
 * 
 * @returns {string} The current timezone after the operation.
 *   - If the provided timezone is valid, returns the new timezone identifier
 *   - If the provided timezone is invalid, returns the unchanged current timezone
 * 
 * @example
 * // Set to UTC (Coordinated Universal Time)
 * setTimeZone('UTC');
 * console.log(timeZone); // 'UTC'
 * // Timestamps will show UTC time: 2023-12-25T15:30:45.123Z
 * 
 * @example
 * // Set to New York timezone (Eastern Time)
 * setTimeZone('America/New_York');
 * // Timestamps will show Eastern time with DST handling
 * 
 * @example
 * // Set to London timezone (Greenwich Mean Time / British Summer Time)
 * setTimeZone('Europe/London');
 * // Automatically handles GMT/BST transitions
 * 
 * @example
 * // Set to Tokyo timezone (Japan Standard Time)
 * setTimeZone('Asia/Tokyo');
 * // Shows JST: UTC+9 hours
 * 
 * @example
 * // Invalid timezone is ignored
 * const current = timeZone;
 * setTimeZone('Invalid/Timezone');
 * console.log(timeZone === current); // true - unchanged
 * 
 * @example
 * // Common server deployments
 * setTimeZone('UTC'); // Recommended for servers
 * setTimeZone('America/Chicago'); // Central Time
 * setTimeZone('Europe/Berlin'); // Central European Time
 * setTimeZone('Asia/Singapore'); // Singapore Time
 * 
 * @example
 * // Application startup timezone configuration
 * setTimeZone('Europe/Paris'); // Default for French applications
 * // All log timestamps will be shown in Paris time (CET/CEST)
 */
declare function setTimeZone(tz: string): string {}

/**
 * Sets the locale for date and time formatting in log messages.
 * Used to control the regional format of timestamps in log output.
 * 
 * @param {string} loc - The locale string to set (e.g., 'en-US', 'fr-FR', 'de-DE', 'ja-JP')
 *   - Must be a valid BCP 47 language tag format
 *   - Examples: 'en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'pt-BR', 'ru-RU', 'zh-CN', 'ja-JP'
 *   - Invalid locales are ignored and the current locale remains unchanged
 * 
 * @returns {string} The current locale after the operation.
 *   - If the provided locale is valid, returns the new locale
 *   - If the provided locale is invalid, returns the unchanged current locale
 * 
 * @example
 * // Set to US English format
 * setLocale('en-US');
 * console.log(locale); // 'en-US'
 * // Timestamps will be formatted as: 12/25/2023, 10:30:45 AM
 * 
 * @example
 * // Set to French format
 * setLocale('fr-FR'); 
 * // Timestamps will be formatted as: 25/12/2023 10:30:45
 * 
 * @example
 * // Set to German format
 * setLocale('de-DE');
 * // Timestamps will be formatted as: 25.12.2023, 10:30:45
 * 
 * @example
 * // Invalid locale is ignored
 * const current = locale;
 * setLocale('invalid-locale');
 * console.log(locale === current); // true - unchanged
 * 
 * @example
 * // Japanese format
 * setLocale('ja-JP');
 * // Timestamps will be formatted as: 2023/12/25 10:30:45
 */
declare function setLocale(loc: string): string {}

/**
 * Sets the minimum logging level for the logger.
 * Only logs at or above this level will be output.
 * 
 * @param {Level} lvl - The logging level to set. Must be one of: 'error', 'warn', 'info', 'debug'
 *   - 'error' (0): Only error messages
 *   - 'warn' (1): Warning and error messages  
 *   - 'info' (2): Info, warning, and error messages
 *   - 'debug' (3): All messages including debug output
 * 
 * @returns {Level} The current logging level after the operation.
 *   - If the provided level is valid, returns the new level
 *   - If the provided level is invalid, returns the unchanged current level
 * 
 * @example
 * // Set to only show errors and warnings
 * setLevel('warn');
 * console.log(getLevel()); // 'warn'
 * 
 * @example
 * // Set to show all log messages
 * setLevel('debug');
 * 
 * @example
 * // Invalid level is ignored, returns current level
 * setLevel('invalid'); // Returns current level unchanged
 * 
 * @example
 * // Production setup - minimal logging
 * setLevel('error');
 * 
 * @example
 * // Development setup - verbose logging  
 * setLevel('debug');
 */
declare function setLevel(lvl: Level): Level {}

/**
 * Sets whether log output should include ANSI color codes.
 * 
 * @param {boolean} clr - Whether to enable colorization
 *   - true: Enable ANSI color codes in log output
 *   - false: Disable ANSI color codes (plain text output)
 * 
 * @returns {boolean} The current colorization state after the operation
 * 
 * @example
 * // Enable colors for terminal output
 * setColorize(true);
 * 
 * @example
 * // Disable colors for file logging or CI/CD
 * setColorize(false);
 * 
 * @example
 * // Toggle based on environment detection
 * const isTerminal = process.stdout.isTTY;
 * setColorize(isTerminal);
 */
declare function setColorize(clr: boolean): boolean {}


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
