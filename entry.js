require( './styles/impossiblefish.css' );

import * as autosizeTank from './scripts/autosizeElement.js';

let behaviours = [ autosizeTank ];         

window.onload = function(){
 let canvas = $('canvas'),
     fishtank = $('#fishtank');
 behaviours.forEach( behaviour => {
  if ( behaviour.init ) {
   let resizeFn = behaviour.init( canvas, fishtank );
   if ( resizeFn ) {
    window.addEventListener( 'resize', resizeFn, false );
    window.addEventListener('orientationchange', resizeFn, false );
   }
  }    
 } );
};

function $( selector, container ) {
 return ( container || document ).querySelector( selector );
}


