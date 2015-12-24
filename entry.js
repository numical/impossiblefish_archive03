require( './styles/impossiblefish.css' );

import * as autosizeTank from './scripts/autosizeTank.js';
import * as menu from './scripts/menu.js'

let behaviours = [ autosizeTank, menu ];

window.onload = function(){
 let canvas = $('canvas');
 behaviours.forEach( behaviour => {
  if ( behaviour.init ) {
   let resizeFn = behaviour.init( canvas );
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


