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
           "<%= path.src %>/sass/**/*.scss",
           "<%= path.src %>/js/app/**/*.js",
           "<%= path.src %>/js/ep/**/*.js"
        ]
    },
};

module.exports = function () {
    return {
        "dev": _.extend({}, options, {
            "dest": "<%= path.build.dev %><%= path.assets %>/js/modernizr.js"
        }),
        "dist": _.extend({}, options, {
            "dest": "<%= path.build.dist %><%= path.assets %>/js/modernizr.js"
        }),
    };
};
