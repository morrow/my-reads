import { initial_state } from '../../reducers'

export const createLocalStore = ()=>{
  let obj = {}
  obj.getItem = (key)=> obj[key]
  obj.setItem = (key, value)=> obj[key] = value
  obj.removeItem = (key)=> delete obj[key]
  return obj
}


export const createPersistanceMiddleware = (storage_key, shape) => store => next => action => {
  next(action)
  let localStorage = window.localStorage || createLocalStore()
  let _state = store.getState()
  let state = {}
  for(let key in shape){
    if(shape[key]){
      state[key] = _state[key]
    }
  }
  state = {
    ...initial_state,
    ...state
  }
  try{
    localStorage.setItem(storage_key, JSON.stringify(state))
  } catch(e){
    localStorage.removeItem(storage_key)
  }
  return { localStorage }
}

export const createHistoryMiddleware = ()=> store => next => action => {
  next(action)
  let state = store.getState()
  if(state.app.path !== window.location.pathname){
    window.history.pushState({}, state.app.path, state.app.path)
  }
}

export const loadInitialState = (storage_key)=> {
  let localStorage = window.localStorage || createLocalStore()
  let initial_state = {}
  try {
    if(localStorage[storage_key]){
      initial_state = JSON.parse(localStorage[storage_key])
    }
  } catch(e){
    console.log(`Error parsing state from localStorage/${storage_key}`)
    localStorage.removeItem(storage_key)
  }
  return initial_state;
}