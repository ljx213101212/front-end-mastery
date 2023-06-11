const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.join(process.cwd(), 'build/library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(process.cwd(), 'build/library/[name].json')
        })
    ]
};