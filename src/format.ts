import type { Logform, transport } from "winston";
import winston from "winston";
import { isString, isStringOfLength } from "@dwtechs/checkard";
import { normalizeInfo } from "./info";

let format: Logform.Format;

function setDateFormat(timeZone: string | undefined, locale: string | undefined): string { 
  const tz = (isString(timeZone) && isStringOfLength(timeZone, 2, 999)) ? timeZone : "europe/paris";
  const l = (isString(locale) && isStringOfLength(locale, 5, 5)) ? locale : "fr-FR";  
  return new Date().toLocaleString(l, { timeZone: tz });
}

function setService(service: string | undefined): string {
  return (isString(service) && isStringOfLength(service, 1, 99)) ? service : "";
}

function setTransports(): transport[] {
  return [new winston.transports.Console()];
  // new winston.transports.File({ filename: 'log.json', format: winston.format.json() })
} 

function setFormat(dateFormat: string, service: string): void {
  const sn = service ? `service="${service}" ` : "";
  format = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: dateFormat }), // YYYY-MM-DD HH:mm:ss:ms
    winston.format.align(),
    // winston.format.label({ label: 'right meow!' }),
    // winston.format.cli(),
    // winston.format.prettyPrint(),
    winston.format.printf(
      (info: Logform.TransformableInfo) => {
        const msg = info.message?.toString() ?? "";
        const ni = normalizeInfo(info);
        const spacer = ' '.repeat(info.level.length);
        if (msg.includes('\n')) {
          const lines = msg.split('\n');
          return lines
            .map((l, i) =>
              !i ? `${info.level} | ${l.trim()} ${sn}${ni}`.trim()
                 : `${spacer} | ${l.trim()}`
            )
            .join('\n');
        } else {
          const cleanMsg = msg.replace(/\s{2,}/g, " ").trim();
          return `${info.level} | ${cleanMsg} ${sn}${ni}`;
        }
    }),
    // winston.format.json(),
    // winston.format.printf(
    //   (info: Logform.TransformableInfo) => {
    //     const msg = info.message
    //       ?.toString()
    //       .replace(/[\n\r]+/g, "")
    //       .replace(/\s{2,}/g, " ");
    //     return JSON.stringify({
    //       timestamp: info.timestamp,
    //       service: sn.trim(),
    //       level: info.level,
    //       message: msg
    //     });
    //   }
  );
}

function getFormat(): Logform.Format {
  return format;
}

export {
  setDateFormat,
  setService,
  setTransports,
  setFormat,
  getFormat,
}
