export function getCSSBoxInfo (element) {
  const style = window.getComputedStyle(element)
  const borderTop = parsePixelProperty(style.borderTopWidth)
  const positionTop = parsePixelProperty(style.top)
  const borderBottom = parsePixelProperty(style.borderBottomWidth)
  const positionBottom = positionTop // parsePixelProperty( style.bottom ) see BUG WORKAROUND below
  const borderLeft = parsePixelProperty(style.borderLeftWidth)
  const positionLeft = parsePixelProperty(style.left)
  const borderRight = parsePixelProperty(style.borderRightWidth)
  const positionRight = positionLeft // parsePixelProperty( style.right ) see BUG WORKAROUND below
  return {
    left: borderLeft + positionLeft,
    right: borderRight + positionRight,
    top: borderTop + positionTop,
    bottom: borderBottom + positionBottom,
    vertical: borderTop + positionTop + borderBottom + positionBottom,
    horizontal: borderLeft + positionLeft + borderRight + positionRight
  }
}

// expects property in 'Npx' format
function parsePixelProperty (property) {
  return parseFloat(property.slice(0, -2))
}

/*
 * BUG WORKAROUND
 * We are assuming the position is symmetrical; i.e. top = bottom and left = right.
 * We cannot use style.bottom and style.right as on Chrome they appear as the defined
 * figure but on Firefox as a calculated figure (probably absolute px).
 */

export function getFirstChildWithTag (parent, tag) {
  const child = parent.firstChild
  return (child.nodeName === tag) ? child : getFirstChildWithTag(child, tag)
}
