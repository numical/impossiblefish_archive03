require( './styles/impossiblefish.css' );

import * as autosizeTank from './scripts/autosizeTank.js';
import * as fillTank from './scripts/fillTank.js';
import * as menu from './scripts/menu.js'

window.onload = function(){
 
 function $( selector, container ) {
  return ( container || document ).querySelector( selector );
 }

 let canvas = $('canvas'), 
     water = $('#water'); 
 autosizeTank.init( canvas );
 menu.init( canvas );
};

