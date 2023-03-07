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