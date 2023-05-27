'use strict'
const common = require("./webpack.geektime.common.config.js")
const { merge } = require("webpack-merge")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, '../geekdist'),
        //https://medium.com/@web_developer/hash-vs-chunkhash-vs-contenthash-e94d38a32208
        //弄清楚hash, chunkhash 和 contenthash 的区别
        filename: '[name]_[contenthash:8].js'
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
                use: [//链式调用, 从数组最右方直到最左方
                    // 'style-loader',//2  与 MiniCssExtractPlugin 工作原理相似，因此冲突。
                    MiniCssExtractPlugin.loader,
                    'css-loader',//1,
                    //https://stackoverflow.com/questions/32234329/what-is-the-loader-order-for-webpack
                    "postcss-loader",
                    {
                        //讲px替换为rem
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 16
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            //[src]: replacePathVariables
                            name: '[name]_[hash:8].[ext]'
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
    //plugin:{} was moved to common
    optimization: {
        minimize: true,
        minimizer: [
            //进行css压缩
            new CssMinimizerPlugin({
                test: /\**\.css$/i,
            }),
        ]
    }
});