// static non-javascript assets for webpack
require( '../static/impossiblefish.css' )

// put all js into chunk - a hack until es6 support natively by webpack
require.ensure(['./startup.js'],(require)=>{
 require('./startup.js')
})

