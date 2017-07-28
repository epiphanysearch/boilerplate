const config = require('./config');
const path = require('path');
const glob = require('glob');

module.exports = function (grunt) {
    return {
        "options": {
            "partialPaths": ["<%= config.src %>/html/partials/"],
            "helpers": {
                "target": function () {
                    return grunt.task.current.target;
                },
                "guid": function () {
                    // We're not trying to be secure, just unique.
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                },
                "getAllPages": function () {
                    var srcPrefix = path.join(process.cwd(), config.src, 'html');
                    var htmlRoot = path.join(config.src, 'html/pages');

                    var files = glob.sync(path.join(htmlRoot, '**/*.ejs'));

                    return files.map(f => ({
                        "path": f.replace(htmlRoot, '').replace('.ejs', '.html'),
                        "title": f.replace(htmlRoot, '').replace('.ejs', '.html')
                    }));
                },
                "render": function (filename, supplied_variables) {
                    const variables = Object.assign(
                        {},
                        { model: {} },
                        supplied_variables
                    );

                    return this.helpers.renderPartial(filename, variables);
                }
            }
        },
        "dev": {
            "files": [
                {
                    "expand": true,
                    "cwd": "<%= config.src %>/html/pages/",
                    "src": "**/*.ejs",
                    "dest": "<%= config.build.dev %>",
                    "ext": ".html"
                }
            ]
        },
        "dist": {
            "files": [
                {
                    "expand": true,
                    "cwd": "<%= config.src %>/html/pages/",
                    "src": "**/*.ejs",
                    "dest": "<%= config.build.dist %>",
                    "ext": ".html"
                }
            ]
        },
        "live": {
            "files": [
                {
                    "expand": true,
                    "cwd": "<%= config.src %>/html/pages/",
                    "src": "**/*.ejs",
                    "dest": "<%= config.build.dist %>",
                    "ext": ".html"
                }
            ]
        }
    };
};
