const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const removeEmpty = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ""));

const defaultLabel = (name) => {
  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export { sleep, removeEmpty, defaultLabel };
