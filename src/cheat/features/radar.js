const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getLegitSettings } = require('../controllers/legit-settings');

module.exports = {
    execute: () => {
        const legitSettings = getLegitSettings();
        if (legitSettings.radar.enabled) {
            for (let i = 1; i < 65; i++) {
                const dwEntity = memoryHelper.getDwEntity(i);
                pMemory.writeMemory(dwEntity + getOffset('m_bSpotted'), 1, memoryjs.INT);
            }
        }
    },
    settings: {
        delay: 400,
    },
}
