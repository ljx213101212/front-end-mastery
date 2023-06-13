Why do we need constructor tool?

1. Convert ES6 Syntax
2. Convert JSX
3. CSS prefix filling / preprocessor
4. Minimize Compression
5. Image Compression

# Core Concept

## compile step

### 以下步骤需要逐一进行源码分析

#### PS: 分析源码比较好用的命令
```sh
grep "[关键字]" -rn ./node_modules/webpack

-r: recursive search
-n: show line number
```

```
entry-option -> run -> make -> before-resolve -> build-module -> normal-module-loader -> program -> seal -> emit

entry-option: 初始化option
run: 开始编译
make: 从entry开始递归的分析依赖，对每个依赖模块进行build
before-resolve:  对模块位置进行解析
build-module: 开始构建某个模块
normal-module-loader: 将loader加载完成的module进行编译，生成AST树
program:  遍历AST, 当遇到require 等一些调用表达式时, 收集依赖
seal: 所有依赖build完成,开始优化
emit: 输出到dist目录

```

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

### Core Module

- webpack-cli
  - yargs

- tapable hooks