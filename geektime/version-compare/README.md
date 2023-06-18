## nodejs-polyfill
```
课程当中提到 
Webpack 4 里面引入crypto-js时，会有将整个polyfill 打包进bundle， 以至于bundle变大的问题
Webpack 5 里面则解决了这个问题

测试: 可能我使用的是webpack 4后期版本，已经解决这个问题了，打包大小差不多

webpack4: 52.4 kb
webpack5: 50.8 kb

```

## tree-shaking-nested-param

```
Webpack4: 所有被引用的文件模块都会被打包
webpack5: 只有直接调用到参数的语句会被打包，间接引用到的文件模块则会被过滤掉.

webpack4: 1.04 kb
webpack5: 43 b
```

## tree-shaking-nested-function

```
webpack4: 所有被引用的文件模块都会被打包
webpack5: 如果最终function没有被调用，那么整个function的引用到的文件模块，包括function call本身都不会被打包

webpack4: 1010 b
webpack5: 28 b
```