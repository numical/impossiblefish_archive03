require( './styles/impossiblefish.css' );

import * as autosizeTank from './scripts/autosizeElement.js';
import * as reactMenu from './scripts/reactMenu.js';

const behaviours = [ autosizeTank, reactMenu ];         

window.onload = function(){
 const gui = { 
   canvas: $('canvas'),
   fishtank: $('#fishtank'),
   menu: $('#menu'),
   openmenu: $('#openmenu')
 };
 behaviours.forEach( behaviour => {
  if ( behaviour.init ) {
   let resizeFn = behaviour.init( gui );
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


