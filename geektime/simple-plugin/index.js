//ref
//https://github.com/jantimon/html-webpack-plugin/blob/main/index.js
//https://github.com/webpack/webpack-sources/blob/main/lib/RawSource.js
//https://stuk.github.io/jszip/documentation/examples.html
//https://gitee.com/geektime-geekbang/geektime-webpack-course/blob/master/code/chapter07/zip-plugin/plugins/zip-plugin.js

const webpack = require("webpack");
const path = require("path");
const JSZip = require("jszip");

class SimplePlugin {

    constructor(options) {
        console.log("[JX TEST] - SimplePlugin - constructor called", options);
        this.options = options;
        this.zip = new JSZip();
    }

    apply(compiler) {
        console.log("[JX TEST] - SimplePlugin -apply called");
        compiler.hooks.initialize.tap('SimplePlugin', () => {
            console.log("[JX TEST] -  compiler.hooks.initialize callback");

            compiler.hooks.thisCompilation.tap('SimplePlugin', (compilation) => {
                console.log("[JX TEST] -  compiler.hooks.thisCompilation callback", compilation ? "OK" : "ERROR");
                compiler.hooks.emit.tapAsync('SimplePlugin', async (compilation, callback) => {

                    const outputPath = path.join(compilation.options.output.path, this.options.outputName + ".zip");
                    for (const file in compilation.assets) {
                        const source = compilation.assets[file].source();
                        const zipPath = path.relative(compiler.options.output.path, outputPath);
                        this.zip.file(file, source);
                        const buffer = await this.zip.generateAsync({ type: 'nodebuffer' });
                        compilation.emitAsset(zipPath, new webpack.sources.RawSource(buffer));
                    }
                    callback();
                });
            }
            );
        });
    }
}

module.exports = SimplePlugin;