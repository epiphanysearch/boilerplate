// Build configuration for Boilerplate
module.exports = {
    // Output directories
    build: {
        dev: 'build/dev/',
        dist: 'build/dist/'
    },

    // Directory where all source for front end build is kept. If you alter this be sure
    // to update the `jspm.directories.baseURL` in `/package.json`, they must share the
    // same location to your source.
    src: 'src/',

    // Directory to place assets when building the frontend. If set to `/` all
    // assets be placed in the root of the build, changing this to `/assets/` will
    // put them in that subdirectory instead.
    assets: '/assets/',

    // After HTML task is run, tasks/amend-asset-path runs to replace [[assets]] with
    // appropriate path for each .html files (i.e. './', '../', '../../' etc). Change
    // to 'absolute' if you know the project will be running from root (i.e. '/').
    assets_url_mode: 'relative'
};
