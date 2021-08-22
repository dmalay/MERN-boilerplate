const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  entry: './client/index.js',
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    // contentBase: resolve(__dirname, 'build'),
    port: 8000,
    host: 'localhost',
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
}

module.exports = config
