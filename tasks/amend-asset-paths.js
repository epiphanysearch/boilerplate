// Task to amend asset paths based on location of .html file.
var config = require('../config/config');

var path = require('path');
var fs = require('fs');

var walk_dir = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk_dir(file));
        } else {
            results.push(file);
        }
    });

    return results;
};

var repeat = function (string, n) {
    var _n = Math.max(0, n);
    var result = "";
    for (var i = 0; i < n; i += 1) {
        result += string;
    }
    return result;
};

module.exports = function (grunt) {
    var content_root = path.join(__dirname, '../build/');
    var relative_replacer = function (filename) {
        var tail = filename
                .replace(content_root, '')
                .replace(/^\/[^\/]+/, '');
        var depth = (tail.match(/\//g) || []).length;
        var path = './';

        if (depth > 1) {
            path = repeat('../', (depth - 1));
        }

        return {
            filename: filename,
            path: path
        };
    };

    var absolute_replacer = function (filename) {
        return {
            filename: filename,
            path: '/'
        };
    };

    grunt.registerTask('amend-asset-paths', 'Replaces [[assets]] with appropriate path for file', function () {
        var token_regex = /\[\[assets]]/g;
        var replacer;

        if (config.assets_url_mode === "absolute") {
            replacer = absolute_replacer;
        } else {
            replacer = relative_replacer;
        }

        var html_files = walk_dir(content_root).filter(function (filename) {
            return /\.html$/.test(filename);
        });

        var replaced_files = html_files.map(replacer);

        replaced_files.forEach(function (each) {
            var original = fs.readFileSync(each.filename).toString();
            var replaced = original.replace(token_regex, (each.path + config.assets).replace(new RegExp('//+', 'g'), '/'));

            fs.writeFileSync(each.filename, replaced);
        });
    });
};
