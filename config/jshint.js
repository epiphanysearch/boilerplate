const stylish = require('jshint-stylish');

module.exports.tasks = {
    jshint: {
        options: {
            reporter: stylish,
        },
        gruntfiles: {
            files: {
                src: [
                    'Gruntfile.js',
                    'config./*.{js,json}',
                    'tasks/*.{js,json}'
                ]
            },

            options: {
                esnext: true
            }
        },
        js: {
            files: {
                src: [
                    '<%= config.src %>/js/app.js',
                    '<%= config.src %>/js/app/**/*.js'
                ]
            },

            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                esnext: true,

                globals: {
                    // AMD
                    alert: true,
                    app: true,
                    module: true,
                    require: true,
                    requirejs: true,
                    define: true,
                    escape: true,
                    // Environments
                    console: true,
                    debugger: true,
                    // General Purpose Libraries
                    $: true,
                    jQuery: true,
                    Modernizr: true,
                    google: true
                }
            }
        }
    }
};
