const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getLegitSettings } = require('../controllers/legit-settings');

let oldPunchX = 0;
let oldPunchY = 0;

module.exports = {
    execute: () => {
        const legitSettings = getLegitSettings();
        if (legitSettings.rcs.enabled) {
            const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
            const iShotsFired = pMemory.readMemory(dwLocalPlayer + getOffset('m_iShotsFired'), memoryjs.INT);
            if (iShotsFired >= 3) {
                const dwClientState = memoryHelper.getDwClientState();
                const currentViewAnglesX = pMemory.readMemory(dwClientState + getOffset('dwClientState_ViewAngles') + 0x4, memoryjs.FLOAT);
                const currentViewAnglesY = pMemory.readMemory(dwClientState + getOffset('dwClientState_ViewAngles'), memoryjs.FLOAT);
                
                const fAimPunchAngleX = pMemory.readMemory(dwLocalPlayer + getOffset('m_aimPunchAngle') + 0x4, memoryjs.FLOAT);
                const fAimPunchAngleY = pMemory.readMemory(dwLocalPlayer + getOffset('m_aimPunchAngle'), memoryjs.FLOAT);
    
                const newViewAnglesX = ((currentViewAnglesX + oldPunchX) - (fAimPunchAngleX * 2));
                const newViewAnglesY = ((currentViewAnglesY + oldPunchY) - (fAimPunchAngleY * 2));
    
                // Add normalization - I don't currently have normalization added due to issues with random 180/360 turns
    
                oldPunchX = fAimPunchAngleX * 2;
                oldPunchY = fAimPunchAngleY * 2;
    
                pMemory.writeMemory(dwClientState + getOffset('dwClientState_ViewAngles') + 0x4, newViewAnglesX, memoryjs.FLOAT);
                pMemory.writeMemory(dwClientState + getOffset('dwClientState_ViewAngles'), newViewAnglesY, memoryjs.FLOAT);
            } else {
                oldPunchX = 0;
                oldPunchY = 0;
            }
        }
    },
    settings: {
        delay: 1,
    },
}
