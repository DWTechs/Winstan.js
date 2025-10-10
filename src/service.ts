import { isStringOfLength } from "@dwtechs/checkard";

// check for env variables
const { SERVICE_NAME } = process?.env ?? null;

let service: string = isStringOfLength(SERVICE_NAME, 1, 99) ? SERVICE_NAME : "";

function getService(): string {
  return service;
}

function setService(srv: string): string {
  service = isStringOfLength(service, 1, 99) ? srv : service;
  return service;
}

export { getService, setService };
