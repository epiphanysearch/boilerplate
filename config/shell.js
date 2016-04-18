const system_path = require('path');
const project_paths = require('../config/path.js');

module.exports = function () {
    const output_path = system_path.join(project_paths.build.dist, project_paths.assets, 'js--copy/app.js');

    return {
        "dist": {
            "command": "jspm bundle app " + output_path + " --skip-source-maps"
        }
    };
};
