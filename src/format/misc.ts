import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";


function formatMisc(ctx: Record<string, string | number | string[] | number[]>): string {
  let m = "";
  for (const key in ctx) {
    if (key === "message" || key === "level")
      continue;
    const v = ctx[key];
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
