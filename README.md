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

## Important Configs

- devServer
- loaders
