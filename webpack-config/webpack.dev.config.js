const common = require("./webpack.common.config.js")
const { merge } = require("webpack-merge")
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
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
                use: ['style-loader', 'css-loader']
            }
        ]
    },
})