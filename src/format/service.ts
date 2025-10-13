import { getService } from "../conf/service";

function formatService(srv?: string): string {
  return getService() ? `service="${getService()}" ` : "";
}

export { formatService };