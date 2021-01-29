const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getLegitSettings } = require('../controllers/legit-settings');

module.exports = {
    execute: () => {
        const legitSettings = getLegitSettings();
        if (legitSettings.noFlash.enabled) {
            const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
            const flFlashMaxAlpha = pMemory.readMemory(dwLocalPlayer + getOffset('m_flFlashMaxAlpha'), memoryjs.FLOAT);
            if (flFlashMaxAlpha > 0.0) {
                pMemory.writeMemory(dwLocalPlayer + getOffset('m_flFlashMaxAlpha'), 0.0, memoryjs.FLOAT);
            }
        }
    },
    settings: {
        delay: 500,
    },
}
