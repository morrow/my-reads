import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app/App';

import { createStore } from 'redux'
import myReadsApp from './reducers'

import { render } from './index'

import { initial_state as initial_app_state } from './modules/app/appReducer.js'
import { initial_state as initial_book_state } from './modules/book/bookReducer.js'
import { initial_state as initial_search_state } from './modules/search/searchReducer.js'

const store = createStore(myReadsApp)

const initial_state = {
  app: initial_app_state,
  book:  initial_book_state,
  search: initial_search_state
}

it('renders without crashing', () => {
  render(document.createElement('root'))
  // const div = document.createElement('div');
  // ReactDOM.render(<App state={store.getState()} />, div);
});

it('renders the initial state', () => {
  expect(myReadsApp(undefined, {})).toEqual(initial_state)
})