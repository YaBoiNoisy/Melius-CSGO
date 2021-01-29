const memoryjs = require('memoryjs');

const { getOffset } = require('./offsets');
const pMemory = require('./pMemory');
const { getProcessState } = require('./processState');

module.exports.getDwLocalPlayer = () => {
    const { clientDll } = getProcessState();
    return pMemory.readMemory(clientDll + getOffset('dwLocalPlayer'), memoryjs.INT);
}

module.exports.getDwEntity = (index) => {
    const { clientDll } = getProcessState();
    return pMemory.readMemory(clientDll + getOffset('dwEntityList') + (index - 1) * 0x10, memoryjs.INT);
}

module.exports.getDwClientState = () => {
    const { engineDll } = getProcessState();
    return pMemory.readMemory(engineDll + getOffset("dwClientState"), memoryjs.INT);
}

module.exports.getM_iTeamNum = (address) => {
    return pMemory.readMemory(address + getOffset("m_iTeamNum"), memoryjs.INT);
};

module.exports.getM_iHealth = (address) => {
    return pMemory.readMemory(address + getOffset("m_iHealth"), memoryjs.INT);
};

module.exports.setDwForceAttack = (value) => {
    const { clientDll } = getProcessState();
    pMemory.writeMemory(clientDll + getOffset("dwForceAttack"), value, memoryjs.INT);
};
