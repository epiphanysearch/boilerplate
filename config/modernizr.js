const _ = require('lodash');

const options = {
    "options": [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
    ],
    "uglify": true,
    "devFile": "node_modules/modernizr/bin/modernizr",
    "files": {
        "src": [
           "<%= config.src %>/sass/**/*.scss",
           "<%= config.src %>/js/app/**/*.js",
           "<%= config.src %>/js/ep/**/*.js"
        ]
    },
};

module.exports = function () {
    return {
        "dev": _.extend({}, options, {
            "dest": "<%= config.build.dev %><%= config.assets %>/js/modernizr.js"
        }),
        "dist": _.extend({}, options, {
            "dest": "<%= config.build.dist %><%= config.assets %>/js/modernizr.js"
        }),
    };
};
