const memoryjs = require("memoryjs");
const aks = require('asynckeystate');

const { getOffset } = require("../controllers/offsets");
const { getProcessState } = require("../controllers/processState");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getLegitSettings } = require('../controllers/legit-settings');

module.exports = {
  execute: () => {
    const legitSettings = getLegitSettings();
    if (legitSettings.bunnyhop.enabled) {
      const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
      const iFlags = pMemory.readMemory(dwLocalPlayer + getOffset('m_fFlags'), memoryjs.INT);
      if (aks.getAsyncKeyState(0x20)) {
        const value =  iFlags === 257 || iFlags === 263 ? 5 : 4;
        const { clientDll } = getProcessState();
        pMemory.writeMemory(clientDll + getOffset('dwForceJump'), value, memoryjs.INT);
      }
    }
  },
  settings: {
    delay: 10,
  },
};
