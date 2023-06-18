const path = require('path');

module.exports = {
    entry: './tree-shaking-nested-param/index.js',
    output: {
        path: path.join(__dirname, 'dist-treeshaking-nested-param'),
        filename: 'bundle.js'
    }
}