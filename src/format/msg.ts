import { colors, colorize, reset } from "../conf/color";
import type { Level } from "../types";

function formatMsg(level: Level, text: string): string {
  const service = options.service ? `service="${options.service}" ` : "";
  const info = normalizeInfo(entry as any);
  const { date, time } = entry.timestamp as any;
  
  // Pad level to 5 characters (length of "debug" and "error")
  const paddedLevel = entry.level.padEnd(5, ' ');
  const prefix = `${paddedLevel} | date=${date} time=${time} `;
  const indent = ' '.repeat(prefix.length);
  
  // Split message by line breaks and format each line
  const lines = entry.message?.toString().split(/[\n\r]+/) || [];
  const formattedLines = lines.map((line, index) => {
    const trimmedLine = line.replace(/\s{2,}/g, " ").trim();
    if (index === 0) {
      return colorize(entry.level, `${prefix}${trimmedLine} ${service}${info}`.trim());
    } else {
      return colorize(entry.level, `${indent}${trimmedLine}`);
    }
  });
  
  return formattedLines.join('\n');
}

export { 
  formatMsg,
};