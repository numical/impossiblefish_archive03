export function getCSSBoxInfo(element){

  let style = window.getComputedStyle( element ),
      borderTop = parsePixelProperty( style.borderTopWidth ),
      positionTop = parsePixelProperty( style.top ),
      borderBottom = parsePixelProperty( style.borderBottomWidth ),
      positionBottom = positionTop, // parsePixelProperty( style.bottom ) see BUG WORKAROUND below 
      borderLeft = parsePixelProperty( style.borderLeftWidth ),
      positionLeft = parsePixelProperty( style.left ),
      borderRight = parsePixelProperty( style.borderRightWidth ),
      positionRight = positionLeft // parsePixelProperty( style.right ) see BUG WORKAROUND below

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

/*
 * BUG WORKAROUND
 * We are assuming the position is symmetrical; i.e. top = bottom and left = right.
 * We cannot use style.bottom and style.right as on Chrome they appear as the defined
 * figure but on Firefox as a calculated figure (probably absolute px).
 */
