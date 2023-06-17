### simple-loader

小项目: 通过实现一个简单版的mini loader作为练习并领会loader的作用以及开发调试的方法

需求

```
1. 能够加 文件
2. 并且过滤 'foo' 字符 为 '_' .   
3. 替换LINE SEPERATOR 和 PARAGRAPH SEPARATOR  为 unicode 的 string形式, 如 "\u2028"
console.log('\u2028');   // Output: (a blank line)
console.log('\\u2028'); // Output: \u2028
4. 利用options 传入参数name 来给输出程序取别名
5. 用loader-runner, loader-utils 来进行调试

```
