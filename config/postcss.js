const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

module.exports = function (grunt, options) {
    return {
        "dev": {
            "options": {
                "processors": [
                    autoprefixer({
                        "browsers": ['ie 11', 'last 2 versions']
                    })
                ]
            },
            "expand": true,
            "cwd": "<%= config.build.dev %><%= config.assets %>/css--copy",
            "src": "**/*.css",
            "dest": "<%= config.build.dev %><%= config.assets %>/css/"
        },
        "dist": {
            "options": {
                "processors": [
                    autoprefixer({
                        "browsers": ['ie 11', 'last 2 versions']
                    }),
                    csswring({
                        "preserveHacks": true,
                        "map": false,
                        "removeAllComments": true
                    })
                ]
            },
            "expand": true,
            "cwd": "<%= config.build.dist %><%= config.assets %>/css--copy",
            "src": "**/*.css",
            "dest": "<%= config.build.dist %><%= config.assets %>/css/",
            "ext": ".min.css"
        }
    };
};
