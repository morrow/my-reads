import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../app/App'
import Search from './Search'
import SearchContainer from './SearchContainer'
import searchResults from './searchResults'
import searchResultsParsed from './searchResultsParsed'
import searchReducer, { initial_state } from './searchReducer'
import { updateQuery, submitQuery, fetchResults } from './searchActions'
import { initial_state as initial_app_state } from '../../reducers'
import { mapStateToProps, mapDispatchToProps } from './SearchContainer'

beforeEach(function() {
  // mock fetch
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        json: function() {
          return searchResults
        }
      })
    })
  })
})

describe('state management', ()=>{

  it('has initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initial_state)
  })

  it('renders initial state', () => {
    <SearchContainer state={initial_app_state.search} />
  })

  it('updates query state', ()=> {
    let state = searchReducer(undefined, {})
    expect(state.query).toBe('')
    let test_query = 'test'
    let updated_state  = searchReducer(undefined, updateQuery(test_query))
    expect(updated_state.query).toBe(test_query)
  })

  it('updates fetching state', ()=>{
    let state = searchReducer(undefined, {})
    expect(state.fetching).toBe(false)
    let test_query = 'test'
    state = searchReducer(undefined, submitQuery(test_query))
    expect(state.fetching).toBe(true)
  })

  it('re-renders initial state without mutations', () => {
    expect(searchReducer(undefined, {})).toEqual(initial_state)
  })

})

describe('async fetch', ()=>{

  it('fetches results', async () => {
    let query = 'test'
    const response = await fetchResults(query)
    const dispatch = (action)=> {
      switch(action.type){
        case 'SUBMIT_QUERY':
          expect(action.query).toBe(query)
          break
        case 'RECEIVE_RESULTS':
          expect(action.results).toEqual(searchResultsParsed)
          break
        case 'UPDATE_BOOKS':
          expect(action.books).toEqual(searchResultsParsed)
          break
        default:
          console.log(action)
      }
    }
    response(dispatch)
  })

})

describe('container functions', ()=>{

  it('maps props to state', ()=>{
    const query = 'test'
    const state = {
      ...initial_app_state,
      search: searchReducer(initial_state, updateQuery(query))
    }
    expect(mapStateToProps(state, {}).state.query).toEqual(query)
  })

  it('maps dispatch to props', ()=> {
    const query = 'test_query'
    const preventDefault = ()=> {}
    const mock_change_event = {
      preventDefault,
      target: {
        value: query,
      }
    }
    const mock_submit_event = {
      preventDefault,
      target: {
        query: {
          value: query
        }
      }
    }
    const dispatch = (action)=> {
      switch(action.type){
        case 'UPDATE_QUERY':
          expect(action.query).toEqual(query)
          break
        default:
          expect(action).toBeInstanceOf(Function)
      }
    }
    mapDispatchToProps(dispatch, {}).onChange(mock_change_event)
    mapDispatchToProps(dispatch, {}).onSubmit(mock_submit_event)
  })

})
