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
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [//链式调用, 从数组最右方直到最左方
                    'style-loader',//2
                    'css-loader'//1
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        static: './geekdist',
        hot: true
    }
}