import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";
import { formatTxt } from "./txt.js";


function formatMisc(ctx: Record<string, string | number | string[] | number[]>): string {
  let m = "";
  for (const key in ctx) {
    if (key === "message" || key === "level")
      continue;
    const v = ctx[key];
    if (isString(v, "!0") || isNumber(v, false) || isArray(v, ">", 0))
      m += `${key}=${formatTxt(v)} `;
  }
  return m.trim();
}

export {
  formatMisc
}
