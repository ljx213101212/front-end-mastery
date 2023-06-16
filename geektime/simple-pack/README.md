## simple-pack

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
