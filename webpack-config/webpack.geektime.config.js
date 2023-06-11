'use strict'
const webpack = require('webpack');
const common = require("./webpack.geektime.common.config.js")
const { merge } = require("webpack-merge")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const smp = new SpeedMeasureWebpackPlugin();

module.exports = merge(common, smp.wrap({
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
                //use: 'babel-loader',
                // 尽可能减少构建模块
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        //利用babel-loader的缓存node_modules/.cache/babel-loader 
                        //二次构建速度会有所提升，实测 第一次 9000ms，第二次和以后 6000ms
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
                // 尝试了thread-loader,但是相反比不加还耗时，目前猜测是因为项目太小，建立新的wokrer耗时大于多进程产生的效能
                // use: [
                //     {
                //         loader: 'thread-loader',
                //         options: {
                //             workers: 1, //Use 2 worker threads
                //         }
                //     },

                //     'babel-loader',
                // ]
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
    plugins: [
        //和splitChunks reactVendor功能一致，都是分离基础库，使用之一即可，不然会重复引用相同的基础库.
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //       {
        //         module: 'react',
        //         entry: 'https://unpkg.com/react@18.2.0/umd/react.development.js',
        //         global: 'React',
        //       },
        //       {
        //         module: 'react-dom',
        //         entry: 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
        //         global: 'ReactDOM',
        //       },
        //     ]
        // }),
        //
        //利用预编译资源(react,redux这些)来减小输出bundle的大小
        //比如search_92668e0b.js 在加入预编译plugin后只有62.8kb, 如果不加预编译就有194kb.
        // new webpack.DllReferencePlugin({
        //     manifest: require('../build/library/library.json')
        // }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            //进行css压缩
            new CssMinimizerPlugin({
                test: /\**\.css$/i,
            }),
            //注意: 小项目里面 启动并行压缩反而费的时间更长
            // new TerserPlugin({
            //     parallel: true
            // })
        ],
        splitChunks: {
            //超过此大小的chunks才split
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /[\\/]geektime[\\/](common)[\\/]/,
                    name: 'commons',
                    chunks: 'all',
                    //最小引用次数
                    minChunks: 1
                },
                //split react vendor, so it can be cached by user's browser.
                //和html-webpack-externals-plugin 功能一样都是分离基础库, 使用其中之一即可
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor-react',
                    chunks: 'all',
                    //最小引用次数
                    minChunks: 1
                },
            }
        },
        
    },
    //利用resolve 以下的配置把构建速度从 6000ms+ 提升至 5400ms+，节省了600ms
    resolve: {
        //合理使用alias，节省webpack 查找react库的遍历文件的时间
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js')
        },
        //优化resolve.modules 配置 （减少模块搜索层级)
        modules: [
            path.resolve(__dirname, '../node_modules')
        ],
        //优化resolve.extensions 配置
        extensions: ['.js'],
        //优化resolve.mainFields 配置 - 只找package.json 的main
        mainFields: ['main']
    },
    //Found there is no output when no errors occured even no success message.
    //friendly-errors-webpack-plugin can help with this.
    stats: 'normal'
}));