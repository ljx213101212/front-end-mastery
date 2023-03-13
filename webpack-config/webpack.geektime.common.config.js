'use strict'
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './geektime/index.js',
        search: './geektime/search.js',
    },
    output: {
        path: path.join(__dirname, '../geekdist'),
        //https://medium.com/@web_developer/hash-vs-chunkhash-vs-contenthash-e94d38a32208
        //弄清楚hash, chunkhash 和 contenthash 的区别
        filename: '[name]_[contenthash:8].js'
    },
    plugins: [
        //和style loader的会产生冲突
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        //保证每次build都可以清空原先的output文件夹
        new CleanWebpackPlugin()

    ],
    optimization: {
        minimize: true,
        minimizer: [
            //进行css压缩
            new CssMinimizerPlugin({
                test: /\**\.css$/i,
            }),
            //自动生成以给定模版为基础的html文件来承载
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../geektime/index.html'),
                filename: 'index.html',
                chunks: ['index'],
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
    }
}