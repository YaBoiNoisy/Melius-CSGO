const memoryjs = require("memoryjs");
const aks = require("asynckeystate");
const sleep = require("sleep");

const memoryHelper = require('../controllers/memoryHelper');
const pMemory = require("../controllers/pMemory");

module.exports = {
  execute: () => {
    if (aks.getAsyncKeyState(0x70)) {
      sleep.msleep(200);
      const dwClientState = memoryHelper.getDwClientState();
      pMemory.writeMemory(dwClientState + 0x174, -1, memoryjs.INT);
    }
  },
  settings: {
    delay: 1,
  },
};
