'use strict'
const path = require('path');
const { merge } = require("webpack-merge")
const common = require('./webpack.geektime.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../geektime/ssr/index.js'),
    output: {
        path: path.join(__dirname, '../geekssrdist'),
        filename: 'server.js',
        libraryTarget: 'umd',
        globalObject: `typeof self !== 'undefined' ? self : this`,
        publicPath: path.join(__dirname, '../geekssrdist'),
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
        ]
    },
    plugins: [
        //将文件拷贝到webpack输出文件夹中
        new CopyWebpackPlugin({
            patterns: [{
                from: 'geektime/README.md'
            }]
        }),
        //保证每次build都可以清空原先的output文件夹
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, `../geektime/ssr/index.html`),
            filename: `server.html`,
            chunks: ['server'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ]
};