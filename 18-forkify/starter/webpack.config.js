const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('node:path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000, // Any file smaller than this will be inlined
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'forkify',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    hot: true,
    compress: true,
  },
};
