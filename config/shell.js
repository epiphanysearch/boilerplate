const system_path = require('path');
const coonfig = require('./config');

module.exports = function () {
    const output_path = system_path.join(coonfig.build.dist, coonfig.assets, 'js--copy/app.js');

    return {
        "dist": {
            "command": "jspm bundle app " + output_path + " --skip-source-maps"
        }
    };
};
