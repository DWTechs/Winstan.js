# 0.7.1 (May 28th 2026)

- **FIX**: Add missing file extensions to `main` (`dist/winstan.js`) and `types` (`dist/winstan.d.ts`) fields in `package.json`.


# 0.7.0 (Apr 6th 2026)

- **PERF**: Cache `Intl.DateTimeFormat` instances in `formatDate()`. Formatters are now rebuilt only when locale or timezone changes, eliminating object allocation on every log call.
- **PERF**: `isProduction` flag is now evaluated once at module load instead of on every `msg()` call.
- **PERF**: `NEWLINE_RE` and `WHITESPACE_RE` regex literals hoisted to module-level constants in `logger.ts` to avoid recompilation per call.
- **PERF**: `level=<value>` strings pre-computed in a lookup map (`LEVEL_PREFIX`) to avoid template literal allocation per log call.
- **PERF**: The 5 chained `.replace()` calls in `formatTxt()` replaced by a single-pass regex with a `switch`-based replacer function.
- **PERF**: `QUOTE_CHECK_RE` and `ARRAY_QUOTE_RE` regex literals hoisted to module-level constants in `txt.ts`.
- **PERF**: Trailing space removal in `formatMisc()` replaced with `slice(0, -1)` (O(1)) instead of `.trim()` (O(n)).


# 0.6.0 (Apr 1st 2026)

- **PERF**: `log` methods now accept a function `() => string` as the `txt` parameter for lazy evaluation. The function is only called when the log level is enabled, avoiding unnecessary string construction.
- **NEW**: Added `isLevelEnabled(lvl)` to check whether a given log level is active. Useful for guarding additional logic beyond logging against the current log level.


# 0.5.0 (Oct 20th 2025)

- No longer uses Winston as a dependency
- Environment-based log formatting:
  - Development mode (default): Human-readable multiline logs with indentation
  - Production mode (`NODE_ENV=production|prod`): Pure logfmt format with escaped newlines
- **IMPROVED**: Enhanced multiline message handling:
  - Development: Indented continuation lines for better readability
  - Production: Escaped newlines within single logfmt entries
- **NEW**: Added smart colorization with `COLORIZE` environment variable
  - Colors automatically enabled in development mode, disabled in production mode
  - Manual override via `COLORIZE` env var ("true"/"1" to enable, "false"/"0" to disable)
  - Optimizes log output for different environments while allowing customization
- **NEW**: Added initialization functions:
  - `setLevel()`
  - `setColors()`
  - `setColorize()`
  - `setLocale()`
  - `setTimeZone()`
  - `setService()`
- Update @dwtechs/checkard dependency to 3.6.0


# 0.4.0 (Mar 15th 2025)

- Add info property to the log function to add more information to the log if necessary
- Use Logfmt format for logs
- Update @dwtechs/checkard dependency to 3.2.3 


# 0.3.0 (Jan 10th 2025)

- Perf Express middleware is now a npm plugin : @dwtechs/winstan-plugin-express-perf 


# 0.2.1 (Dec 17th 2024)

- Fix perf middleware export


# 0.2.0 (Dec 16th 2024)

- Add performance logs for Express.js


# 0.1.1 (Dec 15th 2024)

- Fix end of line issue
- Improve Typescript declaration


# 0.1.0 (Dec 13th 2024)

- Initial release
