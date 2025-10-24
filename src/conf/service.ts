import { isStringOfLength } from "@dwtechs/checkard";

// Check for environment variable at startup
const { SERVICE_NAME } = process?.env ?? null;

let service: string = "";

function setService(srv: string | undefined): string {
  if (isStringOfLength(srv, 1, 99))
    service = srv;
  return service;
}

function getService(): string {
  return service;
}

setService(SERVICE_NAME);

export { setService, getService };
