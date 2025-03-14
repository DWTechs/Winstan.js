
import type { Logform, transport } from "winston";
import winston from "winston";
import { isString, isStringOfLength } from "@dwtechs/checkard";

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
  const sn = service ? `${service} ` : "";
  format = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: dateFormat }), // YYYY-MM-DD HH:mm:ss:ms
    winston.format.align(),
    // winston.format.label({ label: 'right meow!' }),
    // winston.format.cli(),
    // winston.format.prettyPrint(),
    winston.format.printf(
      (info: Logform.TransformableInfo) => {
        const msg = info.message
          ?.toString()
           .replace(/[\n\r]+/g, "")
           .replace(/\s{2,}/g, " ");
        return `${info.timestamp} - ${sn}${info.level} - id=${info.id} - userId=${info.id} - tags=${info.tags.toString()} : ${msg}`;
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
