'use strict'
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const utils = require("./webpack.geektime.utils.config");

module.exports = {
    entry: utils.entry,
    //不同环境需要有不同的output, 这里只是给出default值
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
        //将文件拷贝到webpack输出文件夹中
        new CopyWebpackPlugin({
            patterns: [{
                from: 'geektime/README.md'
            }]
        }),
        //保证每次build都可以清空原先的output文件夹
        new CleanWebpackPlugin(),
        //输出打包过程中的状态信息
        new FriendlyErrorsWebpackPlugin(),
        //打开用来分析bundle体积占用ui页面，通常只有调试bundle体积时才打开
        //new BundleAnalyzerPlugin(),
        //compiler 在每次构建结束后会触发done这个hook
        function() {
            this.hooks.done.tap('done', (stats) => {
                console.log("[JX TEST] - webpack compiler done");
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log('build error');
                    //error code 1 主动处理构建报错
                    process.exit(1);
                }
            })
        },   
        //加载多页面(html entry)打包的的插件
        ...utils.htmlWebpackPlugins
    ],
}