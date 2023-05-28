'use strict'
const path = require('path');
const { merge } = require("webpack-merge")
const common = require('./webpack.geektime.common.config')

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, '../geekdevdist'),
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
        static: {
            directory: path.join(__dirname, "../geekdevdist")
        },
        port: 9001,
    },
    //引入source map
    //https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',
});