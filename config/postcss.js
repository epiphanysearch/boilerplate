const autoprefixer = require('autoprefixer-core');
const csswring = require('csswring');

module.exports = function (grunt, options) {
    return {
        "dev": {
            "options": {
                "processors": [
                    autoprefixer({
                        "browsers": ['ie 8', 'ie 9', 'last 2 versions']
                    })
                ]
            },
            "expand": true,
            "cwd": "<%= path.build.dev %><%= path.assets %>/css--unprefixed",
            "src": "**/*.css",
            "dest": "<%= path.build.dev %><%= path.assets %>/css/"
        },
        "dist": {
            "options": {
                "processors": [
                    autoprefixer({
                        "browsers": ['ie 8', 'ie 9', 'last 2 versions']
                    }),
                    csswring({
                        "preserveHacks": true,
                        "map": false,
                        "removeAllComments": true
                    })
                ]
            },
            "expand": true,
            "cwd": "<%= path.build.dist %><%= path.assets %>/css--unprefixed",
            "src": "**/*.css",
            "dest": "<%= path.build.dist %><%= path.assets %>/css/",
            "ext": ".min.css"
        }
    };
};
