const fetch = require("node-fetch");

let offsets = {};

module.exports.setOffsets = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/frk1/hazedumper/master/csgo.json"
  );
  if (response.ok) {
    const { signatures, netvars } = await response.json();
    offsets = { ...signatures, ...netvars };
  }
};

module.exports.getOffset = (name) => parseInt(offsets[name]);
