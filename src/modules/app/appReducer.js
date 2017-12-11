import { getControllerFromPath, getIDFromPath } from './appHelpers'

export const initial_state = {
  path: '',
  controller: 'error',
  id: null,
}

const appReducer = (state = initial_state, action) => {
  const actions = {
    NAVIGATE_TO_PATH: ()=> {
      return {
        ...state,
        path: action.path,
        controller: getControllerFromPath(action.path),
        id: getIDFromPath(action.path)
      }
    },
    RESET_STATE: () => initial_state
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default appReducer