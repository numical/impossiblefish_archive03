const FILL_TIME = 2000,
      FILL_COLOUR = 'lightblue';

export function init( canvas ) {
 
 let context = canvas.getContext('2d');
 context.save();
 requestNextFill();

 function requestNextFill() {
  window.requestAnimationFrame( animate, canvas );
 }

 function animate( timeSinceStart ) {
  if ( timeSinceStart  < FILL_TIME ) {
   fill( timeSinceStart/FILL_TIME  );
   requestNextFill();
  } else {
   context.restore();
   canvas.style.background = FILL_COLOUR;
  }
 }
 
 function fill( fraction ) {
  let x = 0,
      y = Math.floor( (1-fraction) * canvas.height ),
      width = canvas.width,
      height = Math.floor( fraction * canvas.height );
  context.fillStyle = FILL_COLOUR; 
  context.fillRect( x, y, width, height );
 }
}
