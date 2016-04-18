// Loader for our own custom block types for processhtml. The default config for
// processhtml.json requires explicit filesnames (can't use path globs: dir/*.js)
// so this file is defined instead, and will load all our custom ones.

var _ = require('lodash');
var fs = require('fs');

module.exports = function (processor) {
    var local_filenames = fs.readdirSync(__dirname);

    var blocktype_filenames = _.filter(local_filenames, function (filename) {
        // Any .js file that doesn't start with an underscore
        return /^[^_].+\.js$/.test(filename);
    });

    _.each(blocktype_filenames, function (filename) {
        require('./' + filename).call(this, processor);
    });
};
