var HtmlWebpackPlugin = require('html-webpack-plugin')
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
var FavIconsWebpackPlugin = require('favicons-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    impossiblefish: './js/start_react.js',
    inline: './js/inline.js'
  },
  output: {
    path: './build',
    filename: '[name].js'
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
      template: './static/index.template',
      cache: false
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['inline'],
      defaultAttribute: 'async'
    }),
    new FavIconsWebpackPlugin({
      logo: './static/impossiblefish.png',
      prefix: 'icons/',
      emitStats: false,
      inject: true,
      title: 'impossible fish',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ]
}
