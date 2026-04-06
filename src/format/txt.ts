import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

const ESCAPE_RE = /[\\"\n\r\t]/g;
const QUOTE_CHECK_RE = /[\s"'=\\]/;
const ARRAY_QUOTE_RE = /"/g;

function escapeChar(c: string): string {
  switch (c) {
    case '\\': return '\\\\';
    case '"':  return '\\"';
    case '\n': return '\\n';
    case '\r': return '\\r';
    case '\t': return '\\t';
    default:   return c;
  }
}

// Helper to format values for logfmt
function formatTxt(value: string | number | string[] | number[]): string {
  if (isString(value)) {
    const escaped = (value as string).replace(ESCAPE_RE, escapeChar);
    
    // Quote if contains spaces or special characters
    if (QUOTE_CHECK_RE.test(escaped)) {
      return `"${escaped}"`;
    }
    return escaped;
  } else if (isNumber(value)) {
    return value.toString();
  } else if (isArray(value)) {
    // Format arrays as comma-separated quoted values
    const items = (value as (string | number)[]).map(item => 
      isString(item) ? `"${item.toString().replace(ARRAY_QUOTE_RE, '\\"')}"` : item.toString()
    );
    return `[${items.join(',')}]`;
  }
  return String(value);
}

export { 
  formatTxt,
};