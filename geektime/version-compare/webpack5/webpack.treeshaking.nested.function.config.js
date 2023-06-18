const path = require('path');

module.exports = {
    entry: './tree-shaking-nested-function/index.js',
    output: {
        path: path.join(__dirname, 'dist-treeshaking-nested-function'),
        filename: 'bundle.js'
    }
}