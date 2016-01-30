export function init( gui ){
 
 const element = gui.canvas,
       sizeTo = gui.fishtank,
       borders = introspectBorders( element );             
 resize();
 
 function resize(){
  if ( element.width >= sizeTo.clientWidth ) {
   element.width = 0;
   element.height = 0;
  }
  element.width=sizeTo.clientWidth - borders.horizontal * 2;
  element.height=sizeTo.clientHeight - borders.vertical;
  // console.log( element.width + ", " + element.height );
 }

 return resize;
}

// assumes borders defined as 'Npx'
function introspectBorders( element ) {
 let style = window.getComputedStyle( element ), borders = {};
 borders.top = parsePixelProperty( style.borderTopWidth );
 borders.bottom = parsePixelProperty( style.borderBottomWidth );
 borders.left = parsePixelProperty( style.borderLeftWidth );
 borders.right = parsePixelProperty( style.borderRightWidth ) ;
 borders.horizontal = borders.left + borders.right;
 borders.vertical= borders.top + borders.bottom;
 return borders;
}

function parsePixelProperty( property ) {
 return parseFloat( property.slice( 0, -2 ) );
}
