const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const { getProcessState } = require("../controllers/processState");
const pMemory = require("../controllers/pMemory");
const memoryHelper = require("../controllers/memoryHelper");
const { getLegitSettings } = require("../controllers/legit-settings");

const setGlow = (
  index,
  color,
  bRenderWhenOccluded,
  bRenderWhenUnoccluded,
  bFullBloom
) => {
  const { clientDll } = getProcessState();
  const dwGlowObjectManager = pMemory.readMemory(
    clientDll + getOffset("dwGlowObjectManager"),
    memoryjs.INT
  );
  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0x8),
    color.r / 255,
    memoryjs.FLOAT
  );
  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0xC),
    color.g / 255,
    memoryjs.FLOAT
  );
  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0x10),
    color.b / 255,
    memoryjs.FLOAT
  );
  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0x14),
    color.a / 255,
    memoryjs.FLOAT
  );

  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0x28),
    bRenderWhenOccluded,
    memoryjs.BOOL
  );
  pMemory.writeMemory(
    dwGlowObjectManager + (index * 0x38 + 0x29),
    bRenderWhenUnoccluded,
    memoryjs.BOOL
  );
};

const color = { r: 0, g: 0, b: 0, a: 0 };
module.exports = {
  execute: () => {
    const legitSettings = getLegitSettings();
    if (legitSettings.glow.enabled) {
      const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
      const iLocalPlayerTeam = memoryHelper.getM_iTeamNum(dwLocalPlayer);
      for (let i = 1; i < 65; i++) {
        const dwEntity = memoryHelper.getDwEntity(i);
        const iEntityTeam = memoryHelper.getM_iTeamNum(dwEntity);

        const bEntityDormant = pMemory.readMemory(
          dwEntity + getOffset("m_bDormant"),
          memoryjs.INT
        );

        if (!bEntityDormant) {
          const iGlowIndex = pMemory.readMemory(
            dwEntity + getOffset("m_iGlowIndex"),
            memoryjs.INT
          );
          if (iEntityTeam === iLocalPlayerTeam) {
            color.r = legitSettings.glow.allay.color.r;
            color.g = legitSettings.glow.allay.color.g;
            color.b = legitSettings.glow.allay.color.b;
            color.a = legitSettings.glow.allay.color.a;
          } else {
            color.r = legitSettings.glow.enemy.color.r;
            color.g = legitSettings.glow.enemy.color.g;
            color.b = legitSettings.glow.enemy.color.b;
            color.a = legitSettings.glow.enemy.color.a;
          }

          if (legitSettings.glow.allay.enabled && iEntityTeam === iLocalPlayerTeam) {
            setGlow(iGlowIndex, color, true, false, false);
          }
          if (legitSettings.glow.enemy.enabled && iEntityTeam !== iLocalPlayerTeam) {
            setGlow(iGlowIndex, color, true, false, false);
          }
        }
      }
    }
  },
  settings: {
    delay: 20,
  },
};
