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

## Analyzing Webpack bundle for production

```
npm install --save-dev webpack-bundle-analyzer

```

- Bundle Spliting

```
To keep the library code chunck in the individual bundle and cache into browser. Since 99% future commit won't touch library code (unless package update), so the browser only need to update business logic bundle instead of library bundle to boost up the performance.

Strategy #1: Extracting 
```

## Opmizing Bundle for production

- Case 1: imported larget util tooks like loadash, in normal project 80%+ util methods are not utilised.

```
https://www.npmjs.com/package/lodash-es
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

## Optimizing assets for production

- image-webpack-loader(imagemin)

```
npm install image-webpack-loader --save-dev
-rw-r--r--  1 jixiang  staff   1.3M Jan 20 14:26 header-image.5b361a0f2927..jpg
-rw-r--r--  1 jixiang  staff   209K Jan 20 15:41 header-image.a5da3d2f56c9..jpg
```

- ImageMinimizerWebpackPlugin

```
npm install image-minimizer-webpack-plugin imagemin --save-dev
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

- Handle runtimes generated/fetched images

```
npm install copy-webpack-plugin --save-dev
```

- WEBP

## Browser Compatibility

- PostCss

```
https://caniuse.com/

npm install --save-dev autoprefixer postcss-loader
```

- browserslist

```
https://github.com/browserslist/browserslist
```

- babel

```
npm install -D babel-loader @babel/core @babel/preset-env

npm install -D cross-env

npm install --save lodash

npm i core-js

npm install -D @babel/plugin-proposal-pipeline-operator

npm install typescript --save-dev
npm install -D @babel/preset-typescript
```

## Boost developer experience

- Source Maps

```
javascript and css
https://webpack.js.org/configuration/devtool/

css in js

npm i @emotion/css
npm install --save styled-components
npm install --save-dev @emotion/babel-plugin
npm install --save-dev babel-plugin-styled-components
```

## Important Configs

- devServer
- loaders
