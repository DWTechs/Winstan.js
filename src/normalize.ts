
import { 
  isValidInteger, 
  isString,
  isArray
} from "@dwtechs/checkard";

function normalizeId(id?: string | number): string {
  return (isString(id, "!0") || isValidInteger(id, 1)) ? `id: ${id} - ` : "";
}

function normalizeUser(user?: string | number): string {
  return (isString(user, "!0") || isValidInteger(user, 1)) ? `user: ${user} - ` : "";
}

function normalizeTags(tags?: string[] | number[]): string {
  return isArray(tags, ">", 0) ? `[${tags.toString()}] ` : "";
}

export {
  normalizeId,
  normalizeUser,
  normalizeTags,
}
