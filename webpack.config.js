var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
 entry: './entry.js',
 output: {
  path: process.env.NODE_ENV === 'production' ? './dist' : './build',
  filename: 'bundle.js'
 },
 module: {
  loaders: [
   { test: /\.html$/,
     loader: 'file-loader' },
   { test: /\.css$/, 
     loader: 'style-loader!css-loader' },
   { test: /\.(png|woff2)$/, 
     loader: 'url-loader?limit=20000' },
   { test: /\.js$/, 
     loader: 'babel-loader',
     query: {
       presets: [ 'es2015', 'react' ]
     }, 
     exclude: /node_modules/ }
   ]
 },
 plugins: [  
  new CopyWebpackPlugin([
   { from: './static' }
  ])
 ]
}
