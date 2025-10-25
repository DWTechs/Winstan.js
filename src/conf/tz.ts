import { isTimeZone } from "@dwtechs/checkard";

const { TZ } = process?.env ?? null;

const dTimeZone = 'Europe/Paris';

let timeZone: string = isTimeZone(TZ) ? TZ : dTimeZone;

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
function setTimeZone(tz: string): string {
  if (isTimeZone(tz))
    timeZone = tz;
  return timeZone;
}

export { timeZone, setTimeZone };