import type { Logform } from "winston";
import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

function normalizeInfo(info: Logform.TransformableInfo): string {
  let m = "";
  for (const key in info) {
    if (key === "message" || key === "level")
      continue;
    const v = info[key];
    if (isString(v, "!0"))
      m += `${key}="${v}" `;
    if (isNumber(v, true, ">", 0))
      m += `${key}=${v} `;
    if (isArray(v, ">", 0))
      m += `${key}="${v.toString()}" `;
  }
  return m;
}

export {
  normalizeInfo
}
