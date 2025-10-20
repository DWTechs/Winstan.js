import { isString } from "@dwtechs/checkard";
import { shouldLog } from "./conf/level.js";
import { formatMisc } from "./format/misc.js";
import { formatColor } from "./format/color.js";
import { formatDate } from "./format/date.js";
import { formatTxt } from "./format/txt.js";
import type { Level } from "./types";

// Check environment for output format
const isProduction = process?.env?.NODE_ENV === "production" || process?.env?.NODE_ENV === "prod";

function msg(lvl: Level, txt: string, ctx: Record<string, string | number | string[] | number[]>): string {
  
  const ts = formatDate();
  const misc = formatMisc(ctx);
  
  // Production format: pure logfmt (single line with escaped newlines)
  if (isProduction) {
    let logfmtLine = `time=${ts} level=${lvl}`;
    
    // Add context fields using formatMisc
    if (misc)
      logfmtLine += ` ${misc}`;

    // Add message (with escaped newlines for pure logfmt compliance)
    const formattedTxt = formatTxt(txt);
    logfmtLine += ` msg=${formattedTxt}`;
    
    return formatColor(lvl, logfmtLine);
  }
  
  // Development format (default): human-readable multiline
  const lines = txt?.toString().split(/[\n\r]+/) || [];
  if (lines.length > 1) {
    let result = '';
    lines.forEach((line, i) => {
      const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
      if (i === 0) {
        // First line uses the full context
        let firstLine = `time=${ts} level=${lvl}`;
        if (misc)
          firstLine += ` ${misc}`;
        firstLine += ` msg=${formatTxt(trimmedLine)}`;
        result += formatColor(lvl, firstLine);
      } else {
        // Subsequent lines are indented for better readability
        result += '\n' + formatColor(lvl, `  ${trimmedLine}`);
      }
    });
    return result;
  }
  
  // Single line in development mode
  let logfmtLine = `time=${ts} level=${lvl}`;
  
  // Add message (no escaping in development for readability)
  const formattedTxt = formatTxt(txt);
  logfmtLine += ` msg=${formattedTxt}`;

  // Add context fields using formatMisc
  if (misc)
    logfmtLine += ` ${misc}`;
  
  return formatColor(lvl, logfmtLine);
}


// // Initialize with environment variables
// const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
// const defaultLevel: Level = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// // Initialize on module load
// init(TZ, LOCALE, SERVICE_NAME, defaultLevel);


function print(
  lvl: Level,
  txt: string,
  ctx?: Record<string, string | number | string[] | number[]>
): void {
  
  if (!shouldLog(lvl))
    return;

  if (!isString(txt, "!0"))
    return;
  
  const m = msg(lvl, txt, ctx || {});
  
  // Output to console
  if (lvl === 'error')
    console.error(m);
  else if (lvl === 'warn')
    console.warn(m);
  else
    console.log(m);

}

const log = {
  error: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('error', txt, ctx);
  },
  warn: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('warn', txt, ctx);
  },
  info: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('info', txt, ctx);
  },
  debug: (
    txt: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('debug', txt, ctx);
  }
};


export { log, msg };
