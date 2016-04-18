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
            "cwd": "<%= path.src %>/sass/",
            "src": "**/*.scss",
            "dest": "<%= path.build.dev %><%= path.assets %>/css--unprefixed/",
            "ext": ".css"
        },
        "dist": {
            "expand": true,
            "cwd": "<%= path.src %>/sass/",
            "src": "**/*.scss",
            "dest": "<%= path.build.dist %><%= path.assets %>/css--unprefixed/",
            "ext": ".css"
        }
    };
};
