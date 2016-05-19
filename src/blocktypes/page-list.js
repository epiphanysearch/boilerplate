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

    console.log(list);

    return list;
};

module.exports = function (processor) {
    processor.registerBlockType('page-list', function (content, block, block_line, block_content) {
        const pattern = /\/_[^/]+.html$/;
        const files = walk_files(path.join(__dirname, '../html/'))
            .filter(file => !pattern.test(file))
            .filter(file => file.endsWith('html'))
            .sort(function (a, b) {
                return a.split('/').length - b.split('/').length;
            });
        const items = files.map(file => `<li><a href="${file}">${file}</a></li>`);

        return content.replace(block_line, "<ul>" + items.join('') + "</ul>");
    });
};
