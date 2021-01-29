const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require("../controllers/memoryHelper");
const { getLegitSettings } = require('../controllers/legit-settings');

const color = { r: 0, g: 0, b: 0, a: 0 };

const setRender = (entity, color) => {
  const { r, g, b, a } = color;
  pMemory.writeMemory(entity + getOffset("m_clrRender"), r, memoryjs.INT);
  pMemory.writeMemory(entity + getOffset("m_clrRender") + 0x1, g, memoryjs.INT);
  pMemory.writeMemory(entity + getOffset("m_clrRender") + 0x2, b, memoryjs.INT);
  pMemory.writeMemory(entity + getOffset("m_clrRender") + 0x3, a, memoryjs.INT);
};

module.exports = {
  execute: () => {
    const legitSettings = getLegitSettings();
    if (legitSettings.chams.enabled) {
      const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
      const iLocalPlayerTeam = memoryHelper.getM_iTeamNum(dwLocalPlayer);
      for (let i = 0; i !== 65; i++) {
        const dwEntity = memoryHelper.getDwEntity(i);
        const iEntityTeam = memoryHelper.getM_iTeamNum(dwEntity);
        if (iEntityTeam === iLocalPlayerTeam) {
          color.r = legitSettings.chams.allay.color.r;
          color.g = legitSettings.chams.allay.color.g;
          color.b = legitSettings.chams.allay.color.b;
          color.a = legitSettings.chams.allay.color.a;
        } else {
          color.r = legitSettings.chams.enemy.color.r;
          color.g = legitSettings.chams.enemy.color.g;
          color.b = legitSettings.chams.enemy.color.b;
          color.a = legitSettings.chams.enemy.color.a;
        }

        if (legitSettings.chams.allay.enabled && iEntityTeam === iLocalPlayerTeam) {
          setRender(dwEntity, color);
        }
        if (legitSettings.chams.enemy.enabled && iEntityTeam !== iLocalPlayerTeam) {
          setRender(dwEntity, color);
        }
      }
    }
  },
  settings: {
    delay: 1000,
  },
};
