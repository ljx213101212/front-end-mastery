const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // clean: {
        //     dry: true,
        //     keep: /\.css/
        // }
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html'
        })
    ]

}
module.exports = config