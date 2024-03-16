const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const nodeEnv = process.env.NODE_ENV;

module.exports = {
  mode: nodeEnv,
  devtool: nodeEnv === 'development' ? 'source-map' : false,
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `index.js`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        include: [path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist', '**/*.LICENSE.txt'],
    }),
    new HtmlWebpackPlugin({
      pkg,
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, '/'),
    },
    historyApiFallback: true,
    host: 'localhost',
    port: 5000,
    hot: true,
  },
  performance: {
    // Supresses performance warnings
    hints: false,
  },
};
