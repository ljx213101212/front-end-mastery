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
                    // "postcss-loader"
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
});