declare function init(timeZone: string, serviceName: string, nodeEnv: string): void;
declare function log(): winston.Logger;

export { 
  init,
  log,
};
