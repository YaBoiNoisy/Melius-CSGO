const memoryjs = require("memoryjs");

const { getProcessState } = require("./processState");

module.exports.openProcess = (processName) => {
  return new Promise((resolve, reject) => {
    memoryjs.openProcess(processName, (error, process) => {
      if (error) reject(error);
      resolve(process);
    });
  });
};

module.exports.findModule = (moduleName, processId) => {
  return new Promise((resolve, reject) => {
    memoryjs.findModule(moduleName, processId, (error, module) => {
      if (error) reject(error);
      resolve(module);
    });
  });
};

module.exports.readMemory = (address, dataType) => {
  const processState = getProcessState();
  return memoryjs.readMemory(processState.process.handle, address, dataType);
};

module.exports.writeMemory = (address, value, dataType) => {
  const processState = getProcessState();
  return memoryjs.writeMemory(
    processState.process.handle,
    address,
    value,
    dataType
  );
};
