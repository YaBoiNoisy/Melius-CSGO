const memoryjs = require("memoryjs");
const aks = require('asynckeystate');
const sleep = require("sleep");

const { getOffset } = require("../controllers/offsets");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getLegitSettings } = require('../controllers/legit-settings');

module.exports = {
    execute: () => {
        const legitSettings = getLegitSettings();
        if (legitSettings.triggerbot.enabled) {
            const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
            const iLocalPlayerTeam = memoryHelper.getM_iTeamNum(dwLocalPlayer);
            const iCrosshair = pMemory.readMemory(dwLocalPlayer + getOffset('m_iCrosshairId'), memoryjs.INT);
            const dwEntity = memoryHelper.getDwEntity(iCrosshair);
            const iEntityHealth = memoryHelper.getM_iHealth(dwEntity);
            const iEntityTeam = memoryHelper.getM_iTeamNum(dwEntity);
            if (iLocalPlayerTeam != iEntityTeam && iEntityHealth > 0 && iCrosshair >= 1 && iCrosshair < 65) {
                if (aks.getAsyncKeyState(0x58)) {
                    sleep.msleep(legitSettings.triggerbot.delay);
                    memoryHelper.setDwForceAttack(5);
                    sleep.msleep(1);
                    memoryHelper.setDwForceAttack(4);
                }
            }
        }
    },
    settings: {
        delay: 5,
    },
}
