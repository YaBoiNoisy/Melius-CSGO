const jsonfile = require('jsonfile');

module.exports.getLegitSettings = () => {
    return jsonfile.readFileSync('./legitSettings.json');
};
