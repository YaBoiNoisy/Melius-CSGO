const jsonfile = require('jsonfile');

module.exports.getSkins = () => {
    return jsonfile.readFileSync('./skins.json');
};
