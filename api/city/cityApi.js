var fs = require('fs');
var getCities = async function () {
    var file = `api/city/city.json`;
    var result = JSON.parse(fs.readFileSync(file));
    return result;
};
module.exports.getCities = getCities;