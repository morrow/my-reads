import App from './modules/app/App';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createPersistanceMiddleware, loadInitialState, createHistoryMiddleware } from './modules/app/appMiddleware'
import myReadsApp from './reducers'

// create base key for local storage
const local_storage_base_key = 'myReadsApp'
// create logger middleware for logging
const loggerMiddleware = createLogger()
// create history middleware for monitoring history events
const historyMiddleware = createHistoryMiddleware()
// create persistance middleware for persistsing state
export const persistanceMiddleware = createPersistanceMiddleware(local_storage_base_key, { book: true })
// load initial state from localStorage if found
let initialState = loadInitialState(local_storage_base_key)

// get root element and define middleware
let root_element, middleware
if(document.getElementById('root')){ // production
  root_element = document.getElementById('root')
  middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    historyMiddleware,
    persistanceMiddleware
  )
}
else { // testing - create root element and disable log
  root_element = document.createElement('div')
  middleware = applyMiddleware(
    thunkMiddleware,
    persistanceMiddleware,
  )
}

// set up store
export const store = createStore(
  myReadsApp,
  initialState,
  middleware
)

// render
export const render = (element) => ReactDOM.render(
  <Provider store={store} key="provider">
    <App state={store.getState()}/>
  </Provider>
  , root_element
)

// load pathname
const navigateToCurrentPath = () => {
  store.dispatch({
    type: 'NAVIGATE_TO_PATH',
    path: window.location.pathname
  })
}

// go to current page
navigateToCurrentPath()
// start listening for history changes, navigate to path when history changes
window.onpopstate = navigateToCurrentPath

// render app
render(root_element)
store.subscribe(render)