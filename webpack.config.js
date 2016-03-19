var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: './js/startup.js',

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
        loader: HtmlWebpackPlugin.inline('postcss-loader')
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
      asyncDefault: true,
      minify: {
        minifyCSS: true
      }
    })
  ]
}
