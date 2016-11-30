var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var FavIconsWebpackPlugin = require('favicons-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    impossiblefish: './js/startup/start_react.js',
    inline: './js/startup/inline.js'
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
        loader: ExtractTextWebpackPlugin.extract('style-loader', '!css-loader?importLoaders=1!postcss-loader')
      },
      { test: /\.png$/,
        loader: 'url-loader',
        query: {
          mimetype: 'image/png'
        }
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
    new ExtractTextWebpackPlugin('styles.css'),
    new StyleExtHtmlWebpackPlugin(),
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
};
