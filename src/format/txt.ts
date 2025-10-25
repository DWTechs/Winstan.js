import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

// Helper to format values for logfmt
function formatTxt(value: string | number | string[] | number[]): string {
  if (isString(value)) {
    // Escape newlines and other special characters for logfmt
    const escaped = (value as string)
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/"/g, '\\"')    // Escape quotes
      .replace(/\n/g, '\\n')   // Escape newlines
      .replace(/\r/g, '\\r')   // Escape carriage returns
      .replace(/\t/g, '\\t');  // Escape tabs
    
    // Quote if contains spaces or special characters
    if (/[\s"'=\\]/.test(escaped)) {
      return `"${escaped}"`;
    }
    return escaped;
  } else if (isNumber(value)) {
    return value.toString();
  } else if (isArray(value)) {
    // Format arrays as comma-separated quoted values
    const items = (value as (string | number)[]).map(item => 
      isString(item) ? `"${item.toString().replace(/"/g, '\\"')}"` : item.toString()
    );
    return `[${items.join(',')}]`;
  }
  return String(value);
}

export { 
  formatTxt,
};