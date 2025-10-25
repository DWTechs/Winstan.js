# 0.5.0 (Oct 20th 2025)

- No longer uses Winston as a dependency
- Environment-based log formatting:
  - Development mode (default): Human-readable multiline logs with indentation
  - Production mode (`NODE_ENV=production|prod`): Pure logfmt format with escaped newlines
- **IMPROVED**: Enhanced multiline message handling:
  - Development: Indented continuation lines for better readability
  - Production: Escaped newlines within single logfmt entries
- New initialization functions:
  - `setLevel()`
  - `setColors()`
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
