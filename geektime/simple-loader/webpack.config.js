const path = require('path');

module.exports = {
    entry: './example/index.js',
    output: {
        path: path.join(__dirname, 'example'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                  {
                    loader:  path.resolve(__dirname, './index.js'),
                    options: {
                        name: 'helloworld'
                    }
                  }
                ]
            }
        ]
    }
}