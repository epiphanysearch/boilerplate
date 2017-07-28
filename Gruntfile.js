const matchdep = require('matchdep');
const load_grunt_configs = require('load-grunt-configs');

const setup_config = function (grunt) {
    // Dynamically load NPM Grunt Tasks
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Load from configs/ dir
    const configs = load_grunt_configs(grunt);

    // Get contents of package.json
    configs.pkg = grunt.file.readJSON('package.json');

    grunt.initConfig(configs);
};

const define_dev_tasks = function (grunt) {
    // Custom and defaults tasks
    grunt.loadTasks('tasks');

    grunt.registerTask('dev', '[EP] Active development phase', [
        'build-dev',
        'express',
        'open',
        'watch',
    ]);

    grunt.registerTask('build-dev', '[EP] Build for dev', [
        // Clear and lint
        'clean:predev',
        'jshint',

        // CSS, HTML
        'sass-globbing:dev',
        'sass:dev',
        'postcss:dev',
        'processhtml:dev',
        'amend-asset-paths',

        // Copy raw assets folder
        'copy:dev',

        // Run modernizer
        'modernizr:dev',
    ]);

    grunt.registerTask('build', '[EP] Build for dist', [
        // Cleanup and lint
        'clean:predist',
        'jshint',

        // Copy assets, images and fonts
        'copy:dist',

        // CSS, HTML
        'sass-globbing:dist',
        'sass:dist',
        'postcss:dist',
        'processhtml:dist',
        'amend-asset-paths',

        // Image optimisations
        'imagemin',
        'svgmin',

        // Compile JS and make bootstrapper
        'shell:dist',
        'modernizr:dist',
        'concat:dist',
        'removelogging:dist',

        // Post clean
        'clean:dist',

        // Now we can move uglify once all extra files are gone
        'uglify:dist',
    ]);

    grunt.registerTask('live', '[EP] Build for dist and bump major version', [
        'bump:major',
        'build',
        'processhtml:live',
        'amend-asset-paths'
    ]);
};

const define_extra_tasks = function (grunt) {
    // Add your extra tasks here!
};

module.exports = function (grunt) {
    setup_config(grunt);
    define_dev_tasks(grunt);
    define_extra_tasks(grunt);
};
