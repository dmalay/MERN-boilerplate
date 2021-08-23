require('dotenv').config()

const path = require('path')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.config')

const config = {
  mode: 'development',
  optimization: {
    usedExports: true
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'build')
    },
    port: 8088,
    host: 'localhost',
    proxy: {
      target: 'http://localhost:5001',
      context: ['/api', '/ws']
    },
    // webSocketServer: 'ws',
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
}

module.exports = merge(common, config)
