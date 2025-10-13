import { getService } from "../conf/service";

function formatService(): string {
  return getService() ? `service="${getService()}" ` : "";
}

export { formatService };