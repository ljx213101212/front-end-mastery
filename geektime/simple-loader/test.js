const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './example.txt'),
    loaders: [
        {
            loader: path.join(__dirname, './index.js'),
            options: {
                name: 'helloworld'
            }
        }
    ],
    context: {
        emitFile: (url, source) => {
            console.log("[JX TEST] - emitFile", url, source);
            fs.writeFileSync(url, source, 'utf-8');
        },
        //loader-runner removed getOptions function on v3.0.0
        getOptions: (options) => options
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    err ? console.log(err) : console.log(result);
});