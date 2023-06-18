const path = require('path');
const SimplePlugin = require('./index');

module.exports = {
    entry: './example/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new SimplePlugin({
            outputName: "helloworld"
        })
    ]
}