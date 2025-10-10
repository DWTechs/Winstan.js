
import { isArray } from "@dwtechs/checkard";

function normalizeTags(tags?: string[] | number[]): string {
  return isArray(tags, ">", 0) ? `[${tags.toString()}] ` : "";
}

export {
  normalizeTags
}