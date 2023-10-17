const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('node:path');
const { getOptions } = require('loader-utils');

module.exports = function (source) {
  const options = getOptions(this);
  const url = source.replace('url:', ''); // Remove the "url:" scheme
  return `module.exports = "${url}";`;
};

module.exports = {
  mode: 'development',
  entry: './src/js/controller.js',
  output: {
    filename: '[name][fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /url:/,
            use: [
              {
                loader: 'url-loader.js',
              },
            ],
          },
          {
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000, // Any file smaller than this will be inlined
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
