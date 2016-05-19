export const TOGGLE_CONSOLE = 'TOGGLE_CONSOLE'
export const toggleConsole = () => ({ type: TOGGLE_CONSOLE })

export const DISPLAY_TO_CONSOLE = 'DISPLAY_TO_CONSOLE'
export const displayToConsole = (...lines) => ({ type: DISPLAY_TO_CONSOLE, lines: lines })

