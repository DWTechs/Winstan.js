
import { 
  isNumber,
  isString,
  isArray
} from "@dwtechs/checkard";

function normalizeId(id?: unknown): string {
  return (isString(id, "!0") || isNumber(id, true, ">", 0)) ? `id=${id} - ` : "";
}

function normalizeUser(user?: unknown): string {
  return (isString(user, "!0") || isNumber(user, true, ">", 0)) ? `userId=${user} - ` : "";
}

function normalizeTags(tags?: unknown): string {
  return isArray(tags, ">", 0) ? `tags=[${tags.toString()}] - ` : "";
}

export {
  normalizeId,
  normalizeUser,
  normalizeTags,
}
