module.exports = {
    // Used to position the src files: 'creative' or 'webdev'
    // Changing to webdev will cause the build process to look in `src/HTML/` for
    // for the frontend build instead of `src/`.
    //
    // *Note:* if you are changing this manually you will need to move the directory
    // yourself, then update the package.json setting `jspm.directories.baseURL` to
    // match the path: either `src/js` or src/HTML/js`.
    mode: "creative",

    // Directory to place assets when building the frontend. If set to `/` all
    // assets be placed in the root of the build, changing this to `/assets/` will
    // put them in that subdirectory instead.
    assets_folder: '/assets/',

    // After processhtml is run, tasks/amend-asset-path runs to replace [[assets]] with
    // appropriate path for each .html files (i.e. './', '../', '../../' etc). Change
    // to 'absolute' if you know the project will be running from root (i.e. '/').
    assets_url_mode: 'relative',

    // Path to use during developemnt that express will use to redirect you to the
    // Stratus site for the project. If ommitted, '/devsite' will be used.
    devsite_redirect_path: '/devsite'
};
