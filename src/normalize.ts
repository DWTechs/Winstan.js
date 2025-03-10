
import { 
  isStringOfLength, 
  isValidInteger, 
  isString,
  isArray
} from "@dwtechs/checkard";

function normalizeId(id?: string | number): string {
  return ((isString(id) && isStringOfLength(id, 1, 99)) || isValidInteger(id, 1, 99)) ? `id: ${id} - ` : "";
}

function normalizeUser(user?: string | number): string {
  return ((isString(user) && isStringOfLength(user, 1, 99)) || isValidInteger(user, 1, 99)) ? `user: ${user} - ` : "";
}

function normalizeTags(tags?: string[] | number[]): string {
  return isArray(tags, ">", 0) ? `[${tags.toString()}] ` : "";
}

function normalizeLog(
  msg: string,
  id?: string | number,
  user?: string | number,
  tags?: string[] | number[]
): string | false {
  if (!isString(msg, "!0"))
    return false;
  const i = normalizeId(id);
  const u = normalizeUser(user);
  const t = normalizeTags(tags);
  return `${i}${u}${t}${msg}`;
}

export {
  normalizeLog
}
