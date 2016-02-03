export function getCSSBoxInfo(element){

  let style = window.getComputedStyle( element ),
      borderTop = parsePixelProperty( style.borderTopWidth ),
      positionTop = parsePixelProperty( style.top ),
      borderBottom = parsePixelProperty( style.borderBottomWidth ),
      positionBottom = parsePixelProperty( style.bottom ),
      borderLeft = parsePixelProperty( style.borderLeftWidth ),
      positionLeft = parsePixelProperty( style.left ),
      borderRight = parsePixelProperty( style.borderRightWidth ),
      positionRight = parsePixelProperty( style.right );
 
  return {
    left: borderLeft + positionLeft,
    right: borderRight + positionRight,
    top: borderTop + positionTop,
    bottom: borderBottom + positionBottom,
    vertical: borderTop + positionTop +  borderBottom + positionBottom,
    horizontal: borderLeft + positionLeft + borderRight + positionRight
  };
}

// expects property in 'Npx' format
function parsePixelProperty( property ) {
 return parseFloat( property.slice( 0, -2 ) );
}
