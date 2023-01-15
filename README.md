# webpack5 - 2022

## Installation

```
npm install --save-dev webpack webpack-cli webpack-merge webpack-dev-server

npm install --save-dev css-loader style-loader mini-css-extract-plugin

npm install --save-dev html-webpack-plugin html-loader
```

## Concepts

- two ways of importing css

```
 <link rel="stylesheet" href="./src/index.css"> - from HTML (Browser Feature)

 import "./src/index.css" -> from JS (Webpack Feature)
Webpack loads import "./src/index.css" then paste <style>{{content}}</style> into HTML

```

## Optimizing CSS for production

- cssnano
- less
  - https://www.npmjs.com/package/less-loader#webpack-resolver
  - using less can import bootstrap in relative path
- sass
- purgecss

```
npm install css-minimizer-webpack-plugin --save-dev
npm install less less-loader --save-dev
npm install sass-loader sass webpack --save-dev
npm i purgecss-webpack-plugin -D
```

## Browser Compatibility

- PostCss

```
https://caniuse.com/

npm install --save-dev autoprefixer postcss-loader
```

## Important Configs

- devServer
- loaders
