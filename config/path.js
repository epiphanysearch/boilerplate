const project_config = require('./project');

// Frontend build configs
const paths = {
    // Output directories
    build: {
        dev: 'build/dev/',
        dist: 'build/dist/'
    },

    // Directory where all source for front end build is kept.
    src: 'src/',

    // Directory, following on from `src`, where assets should be kept.
    assets: project_config.assets_folder
};

// webdev mode overrides
if (project_config.mode === 'webdev') {
    paths.src = 'src/HTML/';
}

module.exports = paths;
