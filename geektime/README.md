Why do we need constructor tool?

1. Convert ES6 Syntax
2. Convert JSX
3. CSS prefix filling / preprocessor
4. Minimize Compression
5. Image Compression

# Core Concept

## entry

1. single entry as string
2. multiple entires as object

## output

- save the compiled file into storage

## loaders

> common loaders
> A chain is executed in **reverse order**

```
Q: Why it loaders has orders?

A:
{
    test: /\.css$/,
    loaders: ['loaderOne', 'loaderTwo', 'loaderThree']
}
loaderOne(loaderTwo(loaderThree(somefile.css)))

https://github.com/webpack/loader-runner/blob/dac81a7f171993e6a1aa15bfd86b115db197d75d/lib/LoaderRunner.js#L231
```

- babel-loader
  - trasform different JS syntax , from ES6 to ES7 etc...
- css-loader
  - support .css load and analyze
- less-loader
  - convert less to css
- ts-loader
  - covert ts to JS
- file-loader
  - package image and fonts
- raw-loader
  - load files as raw string
- thread-loader
  - bundle js and css in multi-process

## plugins

> common plugins

- CommonsChunkPlugin
  - Extract same code blocks from chunk into common code
- CleanWebpackPlugin
  - Clean the index
- ExtractTextWebpackPlugin
  - Extract css from bundle into independent files
- CopyWebpackPlugin
  - copy file or folder into path directory
- HtmlWebpackPlugin
  - create html file to hold the output bundle
- UglifyjsWebpackPlugin
  - Compress JS
- ZipWebpackPlugin
  - Generate a zip package from the bundle resource.

## Mode

> declare the environment type: production, development, none

## Module

> declare a group of dependencies

- css-loader: loading .css file,
- style-loader: put <style> tag into head

## Hot load

- webpack-dev-server
- webpack-dev-middleware

> Source code learning

1. Webpack compile

- compile js into bundle

2. HMR Server

- output hot load file to HMR Runtime

3. Bundle server

- provide file to be accessed by browser.

4. HMR Runtime

- Will be injected into browser and update file change.

5. bundle.js

- the output bundled file

# Advanced Topic

## 资源内联

### 意义

- 代码层面

  - 页面框架的初始化脚本
  - 上报相关打点 (https://juejin.cn/post/7047710777507053582)
  - css 内联避免页面闪动

- 请求层面： 减少 HTTP 网络请求数
  - 小图片或者字体内联(url-loader)

### HTML 和 JS 内联

- raw-loader 内联 html

```
<script> ${require('raw-loader!babel-loader!./meta.html)}></script>
```

- raw-loader 内联 JS

```
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```

### Treeshaking & Scope Hoisting
```
Supported by default
```
