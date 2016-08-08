const fs = require('fs');
const path = require('path');

const walk_files = function(directory) {
    const list = [];

    const recurse = function (dir) {
        const files = fs.readdirSync(dir);

        files.forEach(function (filename) {
            const file = path.join(dir, filename);

            if (fs.statSync(file).isDirectory()) {
                recurse(file);
            } else {
                console.log(file);
                list.push(file.replace(directory, ''));
            }
        });
    };

    recurse(directory);

    return list;
};

module.exports = function (processor) {
    processor.registerBlockType('page-list', function (content, block, block_line, block_content) {
        const exclude_pattern = /_[^/]+.html$/;
        const start_directory = path.join(__dirname, '../html/');

        // Find all files then filter down to HTML files without a leading '_'
        const files = walk_files(start_directory)
            .filter(file => file.endsWith('html'))
            .filter(file => !exclude_pattern.test(file))
            .sort(function (a, b) {
                // Sort by depth accending
                return a.split('/').length - b.split('/').length;
            });

        const items = files.map(file => `<li><a href="${file}">${file}</a></li>\n`);

        return content.replace(block_line, "<ul>\n" + items.join('') + "</ul>\n");
    });
};
