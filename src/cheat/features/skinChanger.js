const memoryjs = require("memoryjs");

const { getOffset } = require("../controllers/offsets");
const { getProcessState } = require('../controllers/processState');
const pMemory = require("../controllers/pMemory");
const memoryHelper = require('../controllers/memoryHelper');
const { getSkins } = require('../controllers/skins');
const skinsSettings = require("../../../skinsSettings");

const setSkin = (
  iWeaponEntity,
  iSeed,
  fWear,
  iPaintKit,
) => {
  pMemory.writeMemory(iWeaponEntity + getOffset('m_OriginalOwnerXuidLow'), 0, memoryjs.INT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_OriginalOwnerXuidHigh'), 0, memoryjs.INT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_iItemIDLow'), 0, memoryjs.INT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_iItemIDHigh'), -1, memoryjs.INT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_nFallbackSeed'), iSeed, memoryjs.INT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_flFallbackWear'), fWear, memoryjs.FLOAT);
  pMemory.writeMemory(iWeaponEntity + getOffset('m_nFallbackPaintKit'), iPaintKit, memoryjs.INT);
};

module.exports = {
  execute: () => {
    const dwLocalPlayer = memoryHelper.getDwLocalPlayer();
    const skins = getSkins();
    for (let i = 0; i < 8; i++) {
      const iWeaponIndex = pMemory.readMemory(dwLocalPlayer + getOffset('m_hMyWeapons') + ((i - 1) * 0x4), memoryjs.INT) & 0xFFF;
      const iWeaponEntity = memoryHelper.getDwEntity(iWeaponIndex);
      const iWeaponID = pMemory.readMemory(iWeaponEntity + getOffset('m_iItemDefinitionIndex'), memoryjs.INT);
      const iPaintKit = pMemory.readMemory(iWeaponEntity + getOffset('m_nFallbackPaintKit'), memoryjs.INT);
      if (iWeaponID === 0) continue;

      const isWeapon = !!skinsSettings.weapon_ids[iWeaponID];
      const isKnife = !!skinsSettings.knife_ids[iWeaponID];
      // Check if the weapon we want to change is either a knife or a weapon
      if (isWeapon || isKnife) {
        const keys = Object.keys(skins).map((id) => parseInt(id));
        for (const key of keys) {
          const props = skins[key];
          if (iWeaponID == key && iPaintKit != props) {
            setSkin(iWeaponEntity, 1, 0.01, props)
          }
        }
      }

    }
  },
  settings: {
    delay: 5,
  },
};
