const express = require('express')
const app = express()
const path = require('path')
const gzip = require("express-static-gzip");

console.log("[JX TEST] - node env", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'dev') {
    console.log('development mode')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const configuration = require('../webpack-config/webpack.dev.config')
    const webpack = require('webpack')
    const webpackCompiler = webpack(configuration)

    app.use(
        webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
    )

    const webpackHotMiddlware = require('webpack-hot-middleware')
    app.use(webpackHotMiddlware(webpackCompiler))
}

app.get('/', function (req, res) {
    const absolutePathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
    res.sendFile(absolutePathToHtmlFile);
})

app.use('/static', gzip(path.resolve(__dirname, '../dist'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
}))

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000')
});

