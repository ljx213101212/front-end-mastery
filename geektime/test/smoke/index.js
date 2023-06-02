const path = require('path');
const webpack = require('webpack');
const { rimraf } = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

describe('smoke test', async () => {
    it("webpack compile", async () => {
        const ans = await rimraf('./geekdist');
        if (ans) {
            const prodConfig = require("../../../webpack-config/webpack.geektime.config.js");
            webpack(prodConfig, (err, stats) => {
                if (err) {
                    console.error(err);
                    process.exit(2);
                }
                console.log(stats.toString({
                    colors: true,
                    modules: false,
                    children: false
                }));

                console.log('Webpack build success, begin run test.');

                mocha.addFile(path.join(__dirname, 'html-test.js'));
                mocha.addFile(path.join(__dirname, 'css-js-test.js'));
                mocha.run();
            });
        }
    })
});


