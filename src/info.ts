
import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

function normalizeInfo(infos: Record<string, unknown>): string {
  let m = "";
  for (const key in infos) {
    if (key === "message" || key === "level" || key === "timestamp")
      continue;
    const v = infos[key];
    if (isString(v, "!0") || isNumber(v, true, ">", 0))
      m += `${key}=${v} - `;
    if (isArray(v, ">", 0))
      m += `${key}=[${v.toString()}] - `;
  }
  return m;
}

export {
  normalizeInfo
}
