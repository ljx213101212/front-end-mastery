'use strict'
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './geektime/index.js',
        search: './geektime/search.js',
    },
    output: {
        path: path.join(__dirname, '../geekdist'),
        filename: '[name]_[chunkhash:8].js'
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
                    'css-loader'//1
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
    plugins: [
        //和style loader的会产生冲突
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            //进行css压缩
            new CssMinimizerPlugin({
                test: /\**\.css$/i,
            })
        ]
    }
}