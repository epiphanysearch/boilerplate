const config = require('../config/config');

const glob = require('glob');
const path = require('path');

module.exports = function (grunt) {
    grunt.registerMultiTask('sass-globbing', '', function () {
        this.files.forEach(file => {
            const currentFileDirectory = path.dirname(file.src[0]);

            const source = grunt.file.read(file.src[0]);
            const sourceWithAbsolutePaths = source.replace(/@import "([^"]*\*[^"]*)";/g, function (line, capture, offset, string) {
                const captureWithFileDirectory = path.join(currentFileDirectory, capture);
                const files = glob.sync(captureWithFileDirectory);

                return files
                    .map(f => `@import "${ f.replace(currentFileDirectory + '/', '') }";`)
                    .join('\n');
            });

            grunt.file.write(file.dest, sourceWithAbsolutePaths);
        });
    });
};