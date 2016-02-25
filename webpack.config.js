var CopyWebpackPlugin = require('copy-webpack-plugin'),
    autoprefixer = require('autoprefixer')
    
module.exports = {
 
 entry: './js/index.js',
 
 output: {
  // path: process.env.NODE_ENV === 'production' ? './dist' : './build',
  path: './build',
  filename: 'impossiblefish.js'
 },
 
 module: {
  loaders: [
   { test: /\.html$/,
     loader: 'file-loader'
   },
   { test: /\.css$/, 
     loader: 'style-loader!css-loader!postcss-loader'
   },
   { test: /\.(png|woff2)$/, 
     loader: 'url-loader?limit=20000'
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

 postcss: [autoprefixer({browsers: ['last 2 versions']} )],
 
 plugins: [  
  new CopyWebpackPlugin([
   { from: './static/index.html' }
  ])
 ]
}
