# Utlimate Question

What the hack does following command do exactly?
```
webpack build
```

## webpack-cli

### callstacks
```
entry
webpack-cli/bin/cli.js => runCLI
...
webpack-cli/src/webpack-cli.ts => async run(args, parseOptions)
    loadCommand()
    this.webpack = await this.loadWebpack();
    await this.runWebpack(options, isWatchCommandUsed);
    compiler = await this.createCompiler(options as WebpackDevServerOptions, callback);

```

### mini flows
```
1. runCLI -> 2. loadCommand -> 3. runWebpack -> 4.createCompiler -> 5.WEBPACK_PACKAGE (refer #webpack)
```

## webpack

### callstacks

```
lib/webpack.js => webpack
    createCompiler(webpack)
    compiler.run()

lib/Compiler.js => run(callback)
    this.hooks.beforeRun.callAsync()
    this.hooks.run.callAsync()
    this.readRecords()
    this.compile(onComplied)

lib/Compiler.js => compile(callback)
    this.hooks.beforeCompile.callAsync()
    this.hooks.make.callAsync()
    this.hooks.finishMake.callAsync()
    compilation.finish()
    compilation.seal()

```

### mini flows
```
6. createCompiler -> 7. comiler.run -> 8. beforeRun -> 9. run -> 10. readRecord -> 11. beforeCompile -> 12. make -> 13. finishMake -> 14. finish -> 15. seal 
```

#### beforeRun(TODO)


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