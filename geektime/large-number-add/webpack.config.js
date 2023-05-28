const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'large-number-add': './src/index.js',
    'large-number-add.min': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'largeNumberAdd',
    libraryTarget: 'umd',
    libraryExport: ['default'],
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};
