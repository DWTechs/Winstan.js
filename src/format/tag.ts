
import { isArray } from "@dwtechs/checkard";

function formatTags(tags?: string[] | number[]): string {
  return isArray(tags, ">", 0) ? `[${tags.toString()}] ` : "";
}

export {
  formatTags
}