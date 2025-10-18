import { isString } from "@dwtechs/checkard";
import { shouldLog } from "./conf/level.js";
import { formatMisc } from "./format/misc.js";
import { formatTimestamp } from "./format/timestamp.js";
import { formatService } from "./format/service.js";
import { formatColor } from "./format/color.js";
import type { Level } from "./types";

function formatMessage(lvl: Level, msg: string, ctx?: Record<string, string | number | string[] | number[]>): string {
  
  const service = formatService();
  const misc = formatMisc(ctx);

  // Pad level to 5 characters (length of "debug" and "error")
  const paddedLevel = lvl.padEnd(5, ' ');
  const ts = formatTimestamp();
  const prefix = `${paddedLevel} | ${ts} `;
  const indent = ' '.repeat(prefix.length);
  
  // Split message by line breaks and format each line
  const lines = msg?.toString().split(/[\n\r]+/) || [];
  const formattedLines = lines.map((l, i) => {
    const trimmedLine = l.replace(/\s{2,}/g, " ").trim();
    if (!i)
      return formatColor(lvl, `${prefix}${trimmedLine} ${service}${misc}`.trim());
    else
      return formatColor(lvl, `${indent}${trimmedLine}`);
  });
  
  return formattedLines.join('\n');
}


// // Initialize with environment variables
// const { LOCALE, TZ, SERVICE_NAME, NODE_ENV } = process?.env ?? {};
// const defaultLevel: Level = (NODE_ENV === "prod" || NODE_ENV === "production") ? "info" : "debug";

// // Initialize on module load
// init(TZ, LOCALE, SERVICE_NAME, defaultLevel);


function print(
  lvl: Level,
  msg: string,
  ctx?: Record<string, string | number | string[] | number[]>
): void {
  
  if (!shouldLog(lvl))
    return;

  if (!isString(msg, "!0"))
    return;
  
  const m = formatMessage(lvl, msg, ctx);
  
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
    msg: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('error', msg, ctx);
  },
  warn: (
    msg: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('warn', msg, ctx);
  },
  info: (
    msg: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('info', msg, ctx);
  },
  debug: (
    msg: string,
    ctx?: Record<string, string | number | string[] | number[]>,
  ) => {
    print('debug', msg, ctx);
  }
};


export { log };
