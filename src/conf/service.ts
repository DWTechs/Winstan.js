import { isStringOfLength } from "@dwtechs/checkard";

// Check for environment variable at startup
const { SERVICE_NAME } = process?.env ?? null;

let service: string = "";

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
function setService(srv: string | undefined): string {
  if (isStringOfLength(srv, 1, 99))
    service = srv;
  return service;
}

function getService(): string {
  return service;
}

setService(SERVICE_NAME);

export { setService, getService };
