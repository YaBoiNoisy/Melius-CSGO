const processState = {};

module.exports.getProcessState = () => {
    return processState;
}

module.exports.setProcessState = (optionName, optionValue) => {
    processState[optionName] = optionValue;
};
