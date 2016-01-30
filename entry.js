// for webpack: non-javascript static assets
require( './styles/impossiblefish.css' );

// es6-style static imports
import * as autosizeTank from './scripts/autosizeElement.js';
import * as reactMenu from './scripts/reactMenu.js';
const staticBehaviours = [ autosizeTank ] ; //  reactMenu ];         

// dynamic imports (for webpack chunking), not possible in es6
const dynamicBehaviours = [ './scripts/reactMenu.js'];

// main initialisation
window.onload = function(){
 
  // bind to GUI 
  const gui = { 
   window,
   canvas: $('canvas'),
   fishtank: $('#fishtank'),
   menu: $('#menu')
  };

  // initialise static imports
  staticBehaviours.forEach( behaviour => {
    initBehaviour( behaviour, gui );
  });

  // download and initialise dynamic imports
  // use CommonJS syntax until es6 equivalent (System.load()?) available
  dynamicBehaviours.forEach( behaviourId => {
    require.ensure( [], (require) => {
      const behaviour = require(behaviourId);
      initBehaviour( behaviour, gui );
    });
  });
};

function $( selector, container ) {
 return ( container || document ).querySelector( selector );
}

function initBehaviour( behaviour, gui ){
  if ( behaviour.init ) {
    let resizeFn = behaviour.init( gui );
    if ( resizeFn ) {
      gui.window.addEventListener( 'resize', resizeFn, false );
      gui.window.addEventListener('orientationchange', resizeFn, false );
    }
  }    
}


