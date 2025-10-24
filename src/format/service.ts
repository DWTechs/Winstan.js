import { getService } from "../conf/service.js";
import { formatTxt } from "./txt.js";

function formatService(): string {
  const service = getService();
  return service ? `service=${formatTxt(service)}` : "";
}

export { formatService };