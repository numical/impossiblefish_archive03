//export const RESIZE_FISHTANK = 'RESIZE_FISHTANK'
//export const resizeFishtank = (height, width) => ({ type: WINDOW_RESIZED, height: height, width: width })

export const TOGGLE_CONSOLE = 'TOGGLE_CONSOLE'
export const toggleConsole = () => ({ type: TOGGLE_CONSOLE })

export const TOGGLE_MENU = 'TOOGLE_MENU'
export const toggleMenu = () => ({ type: TOGGLE_MENU })

export const DISPLAY_TO_CONSOLE = 'DISPLAY_TO_CONSOLE'
export const displayToConsole = (...lines) => ( { type: DISPLAY_TO_CONSOLE, lines: lines } ) 
