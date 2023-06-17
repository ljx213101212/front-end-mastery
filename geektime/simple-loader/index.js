//refer
//https://github.com/webpack-contrib/json-loader/blob/master/index.js
//https://github.com/webpack-contrib/file-loader/blob/master/src/index.js
//https://github.com/webpack/loader-utils/blob/0c98405f9ab36b26b2f47843c50023199c440a6d/lib/interpolateName.js

const loaderUtils = require("loader-utils")
const fs = require('fs')
const path = require('path')

module.exports = function (source) {
    /** @typedef {import("./Context").ContextOptions} ContextOptions */
    if (this.cacheable) this.cacheable();

    const { name } = this.getOptions(this.query);
    const filename = name;
    const parsed = path.parse(this.resourcePath);
    let ext = "";
    if (parsed.ext) {
        ext = parsed.ext.substr(1);
    }
    const extensionRegex = /\.[^.\\/:*?"<>|\r\n]+$/; // Regex to match file extension
    let filePath = "";
    if (extensionRegex.test(filename)) {
        filePath = filename.replace(extensionRegex, ext); // Swap file extension
    } else {
        filePath = filename + "." + ext;
    }

    const url = loaderUtils.interpolateName(this, filePath, {
        content: source,
    });
    this.emitFile(url, source);

    const value = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/foo/g, '_');
    
    return `module.exports = ${value}`;
}