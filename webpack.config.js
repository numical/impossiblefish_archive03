var HtmlWebpackPlugin = require('html-webpack-plugin')
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: './js/start_react.js',
  output: {
    path: './build',
    filename: 'impossiblefish.js'
  },
  module: {
    loaders: [
      { test: /\.html$/,
        loader: 'file-loader'
      },
      { test: /\.css$/,
        loader: StyleExtHtmlWebpackPlugin.inline('postcss-loader')
      },
      { test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ]
        },
        exclude: /node_modules/
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.template'
    }),
    new StyleExtHtmlWebpackPlugin({minify: true}),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'})
  ]
}
