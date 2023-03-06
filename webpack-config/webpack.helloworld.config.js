'use strict'
const path = require('path');

module.exports = {
    entry: './geektime/index.js',
    output: {
        path: path.join(__dirname, '../geekdist'),
        filename: 'bundle.js'
    },
    mode: 'production'
}