const common = require("./webpack.common.config.js")
const { merge } = require("webpack-merge")
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].[contenthash:12].js',
    },
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: false
        },
        client: {
            overlay: true
        },
        liveReload: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]--[md5:hash:7]'
                        }
                    }
                }]
            }
        ]
    },
})