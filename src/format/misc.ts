import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

// Custom type to replace winston's Logform.TransformableInfo
interface TransformableInfo {
  [key: string]: any;
  message?: string;
  level?: string;
}

function formatMisc(info: TransformableInfo): string {
  let m = "";
  for (const key in info) {
    if (key === "message" || key === "level")
      continue;
    const v = info[key];
    if (isString(v, "!0") || isNumber(v, false))
      m += `${key}="${v}" - `;
    else if (isArray(v, ">", 0))
      m += `${key}=["${v.toString()}]" - `;
  }
  return m;
}

export {
  formatMisc
}
