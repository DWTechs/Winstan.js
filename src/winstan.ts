import winston/*, { transports, format, addColors, createLogger }*/ from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "white",
};
winston.addColors(colors);

let level = "debug";
let tz = "Europe/Paris";
let service = "serviceName";
let format = setFormat(tz, service);
const transports = setTransports();

function setFormat(tz: string, serviceName: string): winston.format {
  return winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms", tz }),
    winston.format.align(),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo) =>
        `[${info.timestamp}] - ${serviceName} ${info.level}: ${info.message
          ?.replace(/[\n\r]+/g, "")
          .replace(/\s{2,}/g, " ")}`,
    ),
  );
}

function setTransports(): winston.transport[] {
  return [new winston.transports.Console()];
}

function setLevel(nodeEnv: string): string {
  return nodeEnv === "development" ? "debug" : "warn";
}
  
function init(timeZone: string, serviceName: string, nodeEnv: string): void {
  level = setLevel(nodeEnv);
  tz = timeZone;
  service = serviceName;
  format = setFormat(tz, service);
}

function log(): winston.Logger {
  return winston.createLogger({ level, levels, format, transports });
}

export {
  init, 
  log,
}


// const errors = [
// 	{ code: 400, level: "warn", name: "Bad request" },
// 	{ code: 401, level: "warn", name: "Unauthorized" },
// 	{ code: 404, level: "warn", name: "Not found" },
// 	{ code: 500, level: "error", name: "Internal" },
// 	{ code: 503, level: "error", name: "Unavailable" },
// ];