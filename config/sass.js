const node_bourbon = require('node-bourbon');
const path = require('path');
const includePaths = []
    .concat(node_bourbon.includePaths)
    .concat([
        path.join(__dirname, '../node_modules/normalize.css/')
    ]);

module.exports = function (grunt, options) {
    return {
        "options": {
            "includePaths": includePaths,
            "sourceComments": 'map',
            "outputStyle": 'nested'
        },
        "dev": {
            "expand": true,
            "cwd": "<%= config.src %>/sass/",
            "src": "**/*.scss",
            "dest": "<%= config.build.dev %><%= config.assets %>/css--unprefixed/",
            "ext": ".css"
        },
        "dist": {
            "expand": true,
            "cwd": "<%= config.src %>/sass/",
            "src": "**/*.scss",
            "dest": "<%= config.build.dist %><%= config.assets %>/css--unprefixed/",
            "ext": ".css"
        }
    };
};
