const node_bourbon = require('node-bourbon');
const path = require('path');

const config = require('./config');

const includePaths = []
    .concat(node_bourbon.includePaths)
    .concat([ path.join(__dirname, '../node_modules/normalize.css/') ])
    .concat([ path.join(__dirname, '../', config.src, 'sass') ]);

module.exports = function (grunt, options) {
    return {
        "options": {
            "includePaths": includePaths,
            "sourceComments": "map",
            "outputStyle": "nested",
            "functions": {
                'base64font($font-name, $content-type: "")': function (font_name, content_type) {
                    const file_path = path.join(config.src, 'assets/fonts', font_name.getValue());
                    const file_buffer = grunt.file.read(file_path, { encoding: null });
                    const base64 = file_buffer.toString('base64');

                    // Whatever was given, or the file extension
                    const font_content_type = content_type.getValue() || 'font/' + font_name.getValue().replace(/^.+?\.(?=[^\.]+$)/, '');

                    return new sass.types.String(`data:${font_content_type};base64,${base64}`);
                }
            }
        },
        "dev": {
            "expand": true,
            "cwd": "<%= config.build.dev %><%= config.assets %>/sass--copy/",
            "src": "**/*.scss",
            "dest": "<%= config.build.dev %><%= config.assets %>/css--copy/",
            "ext": ".css",
        },
        "dist": {
            "expand": true,
            "cwd": "<%= config.build.dist %><%= config.assets %>/sass--copy/",
            "src": "**/*.scss",
            "dest": "<%= config.build.dist %><%= config.assets %>/css--copy/",
            "ext": ".css"
        }
    };
};
