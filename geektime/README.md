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

### Core Module

- webpack-cli
  - yargs

- tapable hooks

### AST (abstract syntax tree)

online demo: https://esprima.org/demo/parse.html  

```
主要应用:
1. 前端framework syntax 转换为AST -> 最终生成浏览器能辨认的 字符串
2. Babel -> 不同版本间的 Javascript Syntax 进行转换， 例如ES6 -> ES5
```

### simplepack

小项目: 通过实现一个简单版的webpack作为练习并领会webpack的核心设计流程

需求
```
1. 可以将es6语法转换成ES5的语法
 - 通过babylon生成AST
 - 通过babel-core将AST重新生成源码
2. 可以分析模块之间的依赖关系
 - 通过babel-traverse 的ImportDeclaration 方法获取依赖属性
3. 生成的JS文件可以在浏览器中运行
```

### simple-loader

小项目: 通过实现一个简单版的mini loader作为练习并领会loader的作用以及开发调试的方法

需求

```
1. 能够加载.json 文件
2. 并且过滤 'foo' 字符 为 '_' .   
3. 替换LINE SEPERATOR 和 PARAGRAPH SEPARATOR  为 unicode 的 string形式, 如 "\u2028"
console.log('\u2028');   // Output: (a blank line)
console.log('\\u2028'); // Output: \u2028
4. 用loader-runner, loader-utils 来进行调试

```

### simple-plugin 

小项目: 通过实现一个简单版的mini plugin作为练习并领会如何根据项目需要，开发webpack插件

```
1.将资源打包成zip 文件
2.输出在dist 目录
3.可自定义zip 文件的名称
```

### React 全家桶和webpack 开发商城项目笔记

> https://gitee.com/geektime-geekbang/geektime-webpack-course/tree/master/code/chapter08/shopping

功能开发要点
```
浏览器端:
  - 组件化，组件颗粒度尽可能小
  - 直接服用经典的构建配置，无需关注构建脚本

服务器端：
  - MVC 开发方式，数据库基于Sequelize
  - Rest API 风格
  - 采用 JWT 进行鉴权

```

```
1. 商城技术展选型
  前端 + 后端

2. 商城架构设计
  - 平台层
    - 用户端
     - 首页 
      - Banner 轮播
      - 公告
      - 商品列表
      - 底部 bar
      - 搜索框
      - 新品列表
     - 列表页
      - 搜索框
      - 左侧bar
      - 右侧列表
     - 详情页
     - 购物车
     - 订单
     - 搜索
     - 登录
     - 注册
    - 管理后台
  - 服务层
    - 商品服务
      - 商品查询服务
      - 商品录入
      - 商品信息修改
    - 订单服务
    - 购物车服务
    - 搜索服务
    - 支付服务
      - 添加评论
      - 删除评论
    - 评论服务
    - 用户服务
      - 登录
      - 注册
      - 个人信息查询
      - 个人信息修改
  - 基础设施
    - MySQL
    - docker
    - k8s

3. 数据库实体和表结构设计
4. 前后端环境搭建
5. 开发
6. 优化策略
  - 渲染优化
   - 首页，列表页，详情页采用SSR 或者 Native 渲染
   - 个人中心页预渲染
  - 弱网优化
    - 使用离线包, PWA等离线缓存技术
  - Webview 优化
    - 打开 Webview 的同时并行地加载页面数据

```

### 加餐

1. 学会建立思考和比对新特性(webpack5 vs webpack4)
 - Treeshaking 链式调用优化
 - Treeshaking 函数嵌套调用优化
 - Module federation 的应用
2. bundle 和 bundless的差异
  bundle: 请求一个bundle.js  (ex. Webpack)
    - 适合生产环境, 减少http请求
  bundleless:  请求没有打包的多个.js 文件 (ex. Snowpack)
    - 适合开发环境，每次更改源文件，只会请求更改的文件，而不用重新打包，更适合热更新（HMR）
3. Vite 的构建原理
  - 重写模块路径 (src/node/server/serverPluginModuleRewrite.js)
  - 静态文件的解析
  - vue 脚本打包策略
   

