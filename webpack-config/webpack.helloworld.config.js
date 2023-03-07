'use strict'
const path = require('path');

module.exports = {
    entry: {
        index: './geektime/index.js',
        search: './geektime/search.js',
    },
    output: {
        path: path.join(__dirname, '../geekdist'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}