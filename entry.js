// static non-javascript assets for webpack
require( './styles/impossiblefish.css' );

// static javascript assets using es6 modules (transpiled by babel for webpack) 
import * as autosizeTank from './scripts/autosizeElement.js';
import * as reactMenu from './scripts/reactMenu.js';
const behaviours = [ autosizeTank, reactMenu ];         

// main initialisation
window.onload = function(){

  // bind to GUI
  const gui = { 
    window,
    canvas: $('canvas'),
    fishtank: $('#fishtank'),
    menu: $('#menu')
  };

  // initialise each behaviour
  behaviours.forEach( b => { initBehaviour( b, gui ) } );
}

// nano JQuery!
function $( selector, container ) {
 return ( container || document ).querySelector( selector );
}

// defines 'behaviour' contract - rather yuk
function initBehaviour( behaviour, gui ) {
  if ( behaviour.init ) {
    let resizeFn = behaviour.init( gui );
    if ( resizeFn ) {
      gui.window.addEventListener( 'resize', resizeFn, false );
      gui.window.addEventListener('orientationchange', resizeFn, false );
    }
  }    
}
