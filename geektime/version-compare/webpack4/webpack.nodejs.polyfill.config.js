const path = require('path');

module.exports = {
    entry: './nodejs-polyfill/index.js',
    output: {
        path: path.join(__dirname, 'dist-nodejs-ployfill'),
        filename: 'bundle.js'
    }
}