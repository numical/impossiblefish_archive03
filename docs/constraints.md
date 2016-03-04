# Constraints
As Impossible Fish is a research project we have no real constraints.  That is bad as it could lure
us into always following the easy path, and never learning how to get around the gotchas.  So some
self-imposed constraints have been added:

## Font
We will use a non-standard font that will/might complicate build process and/or page load issues.

## Canvas Size
The fishtank is drawn on a `<canvas>` element.  We want to ensure that its intrinsic `width` and `height` values always match its actual display size.

i.e. if the  user shrinks the browser window the contents of the fishtank (namely, fish) remain the same size but they are crowded into a smaller tank.


