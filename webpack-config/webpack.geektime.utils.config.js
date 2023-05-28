const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//多页面打包方案
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync([path.join(process.cwd(), './geektime/index/index.js'), path.join(process.cwd(), './geektime/search/index.js')]);
    entryFiles.map((file, _index) => {
        const match = file.match(/geektime\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = file;
        htmlWebpackPlugins.push(
            //自动生成以给定模版为基础的html文件来承载
            new HtmlWebpackPlugin({
                inlineSource: '.css$',
                template: path.join(__dirname, `../geektime/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
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
        )
    });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    htmlWebpackPlugins
}