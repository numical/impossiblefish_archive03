export const TOGGLE_CONSOLE = 'TOGGLE_CONSOLE'
export const toggleConsole = () => ({ type: TOGGLE_CONSOLE })

export const TOGGLE_MENU = 'TOOGLE_MENU'
export const toggleMenu = () => ({ type: TOGGLE_MENU })

export const DISPLAY_TO_CONSOLE = 'DISPLAY_TO_CONSOLE'
export const displayToConsole = (...lines) => ( { type: DISPLAY_TO_CONSOLE, lines: lines } ) 

export const ADD_FISH = 'ADD_FISH'
export const addFish = () => ({type: ADD_FISH})
  
export const REMOVE_FISH = 'REMOVE_FISH'
export const removeFish = () => ({type: REMOVE_FISH})
