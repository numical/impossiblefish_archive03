var webpack = require('karma-webpack')

module.exports = function (config) {
  config.set({
    frameworks: [ 'mocha' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/**/*-test.js'
    ],

    plugins: [webpack, 'karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-spec-reporter'],

    browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ],

    preprocessors: {
      'test/**/*-test.js': ['webpack'],
      'js/**/*.js': ['webpack']
    },

    reporters: [ 'spec' ],

    webpack: {
      module: {
        loaders: [
          { test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: [ 'es2015', 'react' ]
            },
            exclude: /node_modules/
          }
        ]
      }
    },

    webpackMiddleware: { noInfo: true }
  })
}
