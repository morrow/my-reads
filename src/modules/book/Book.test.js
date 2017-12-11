import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';
import Book from './Book'
import FilteredBookList from './FilteredBookList'
import { navigateToPath } from '../app/appActions'
import { getCurrentBook, createMockBook } from './bookHelpers'
import { initial_state as initial_app_state } from '../../reducers'
import { createStore } from 'redux'
import { addBook, removeBook, updateBookStatusById, toggleFullDescription } from './bookActions'
import { mapStateToProps, mapDispatchToProps } from './BookContainer'
import bookReducer, { initial_state } from './bookReducer'
import appReducer from '../app/appReducer'

const store = createStore(bookReducer)

const test_book = createMockBook()

describe('state management', ()=>{

  it('renders initial state', () => {
    expect(bookReducer(undefined, {})).toEqual(initial_state)
    ReactDOM.render(<Book data={test_book} />, document.createElement('div'))
  })

  it('allows you to add a book', () => {
    const action = addBook(test_book)
    expect(bookReducer(undefined, action).books).toEqual([test_book])
  })

  it('allows you to change book status', () => {
    let state = bookReducer(undefined, addBook(test_book))
    const action = updateBookStatusById(test_book.id, 'want-to-read')
    expect(bookReducer(state, action).books[0].status).toEqual('want-to-read')
  })

  it('allows you to remove a book', ()=>{
    let state = bookReducer(undefined, addBook(test_book))
    expect(state).toEqual({
      books: [test_book]
    })
    state = bookReducer(undefined, removeBook(test_book))
    expect(state).toEqual({
      books: []
    })
  })

  it('allows you to toggle book full description', ()=>{
    let state = bookReducer(undefined, addBook(test_book))
    expect(state.books[0].show_full_description).not.toBeDefined()
    state = bookReducer(state, toggleFullDescription(test_book))
  })

  it('re-renders initial state without mutations', ()=>{
    expect(bookReducer(undefined, {})).toEqual(initial_state)
  })

})

describe('filtered book list', ()=>{

  it('renders a filtered book list', ()=> {
    ReactDOM.render('<FilteredBookList />', document.createElement('div'))
  })

  it('re-renders initial state without mutations', ()=>{
    expect(bookReducer(undefined, {})).toEqual(initial_state)
  })

})

describe('helpers', ()=>{

  let state = {
    ...initial_app_state,
    book:{
      books:[
        {
          id: 'a',
          name: 'This should be the current book'
        },
        {
          id: 'b',
          name: 'This is not the current book'
        }
      ]
    }
  }

  it('does not return a current book unless on a book/<id> page', ()=>{
    expect(getCurrentBook(state)).toEqual(undefined)
  })

  it('gets current book from app state', ()=>{
    state = {
      ...state,
      app: appReducer(undefined, navigateToPath('/book/a'))
    }
    expect(getCurrentBook(state).id).toEqual('a')
  })

})

describe('container functions', ()=>{

  it('maps props to state', ()=>{
    const new_status = 'want-to-read'
    let state = {
      ...initial_app_state,
      book: {
        books: [ test_book ]
      }
    }
    state = {
      ...state,
      book: bookReducer(state.book, updateBookStatusById(test_book.id, new_status))
    }
    const own_props = {
      data: test_book
    }
    expect(own_props.data.status).not.toBe(new_status)
    expect(mapStateToProps(state, own_props).data.status).toBe(new_status)
  })

  it('maps dispatch to props', ()=> {
    const own_props = {
      data: test_book
    }
    const mock_event = {
      target: {
        dataset: {
          bookId: test_book.id
        },
        value: 'want-to-read'
      }
    }
    const dispatch = (action)=> {
      switch(action.type){
        case 'ADD_BOOK':
          expect(action.book.id).toBe(test_book.id)
          break
        case 'UPDATE_BOOK_STATUS':
          expect(action.id).toBe(mock_event.target.dataset.bookId)
          expect(action.status).toBe(mock_event.target.value)
          break
      }
    }
    expect(test_book.status).toBe(undefined)
    mapDispatchToProps(dispatch, own_props).onChange(mock_event)
    expect(test_book.status).toBe(undefined)
  })

})
