
const colors = {
  error: "red",
  warn: "orange",
  info: "blue",
  debug: "green",
};

function getColors(): Record<string, string> {
  return colors;
}

export {
  getColors
}
