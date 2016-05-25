export const SHOW_CONSOLE = 'SHOW_CONSOLE'
export const showConsole = () => ({ type: SHOW_CONSOLE })

export const HIDE_CONSOLE = 'HIDE_CONSOLE'
export const hideConsole = () => ({ type: HIDE_CONSOLE })

export const DISPLAY_TO_CONSOLE = 'DISPLAY_TO_CONSOLE'
export const displayToConsole = (...lines) => ({ type: DISPLAY_TO_CONSOLE, lines: lines })

