import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import About from '../about/About'
import Home from '../home/Home'
import Header from './header/Header'
import Footer from './footer/Footer'
import FooterContainer from './Footer/FooterContainer'
import LinkContainer from './Link/LinkContainer'
import ErrorMessage from './ErrorMessage'
import appReducer, { initial_state as initial_app_state } from './appReducer'
import { generateHTML } from './appHelpers'
import { navigateToPath, navigateToCurrentPath } from './appActions'
import { initial_state } from '../../reducers'
import { store } from '../../index'
import { createLocalStore } from './appMiddleware'
import { persistanceMiddleware } from '../../index'
import { createMockBook } from '../book/bookHelpers'


const test_book = createMockBook({status: 'currently-reading'})
const test_book_state = {
  books: [ test_book ]
}

let generateAppHTML = (state)=>{
  return generateHTML(
    <Provider store={store}>
      <App state={state}/>
    </Provider>
  )
}

describe('state management', ()=>{

  it('renders initial state', () => {
    ReactDOM.render('<App />', document.createElement('div'))
    expect(appReducer(undefined, {})).toEqual(initial_app_state)
  })

  it('navigates to a new path', () => {
    let path = '/test'
    let state = appReducer(undefined, navigateToPath(path))
    expect(state.path).toEqual(path)
  })

  it('persists state', ()=>{
    let state = {
      ...initial_state,
      book: test_book_state
    }
    const FakeStore = (state={})=>{
      let _state = state
      return {
        getState: ()=> _state
      }
    }
    let mockStore = FakeStore(state)
    const mockNext = () => {  }
    let pm = persistanceMiddleware(mockStore)(mockNext)(state)
    let local_storage_books = JSON.parse(pm.localStorage.getItem('myReadsApp')).book.books
    let mock_store_books = mockStore.getState().book.books
    expect(local_storage_books).toEqual(mock_store_books)
  })

  it('re-renders initial state without mutation', () => {
    expect(appReducer(undefined, {})).toEqual(initial_app_state)
  })

})

describe('rendering', ()=>{

  it('it renders header', ()=>{
    let app = generateAppHTML(initial_state)
    let header = generateHTML(
      <Provider store={store}>
        <Header />
      </Provider>)
    expect(app.indexOf(header) > 0).toEqual(true)
  })

  it('it renders footer', ()=>{
    let app = generateAppHTML(initial_state)
    let footer = generateHTML(
      <Provider store={store}>
        <FooterContainer />
      </Provider>)
    expect(app.indexOf(footer) > 0).toEqual(true)
  })

  it('navigate to and renders home page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/'))
    }
    expect(state.app.controller).toBe('home')
    let app = generateAppHTML(state)
    let home = generateHTML(
      <Provider store={store}>
        <Home state={state}/>
      </Provider>
    )
    expect(app.indexOf(home) >= 0).toBe(true)
  })

  it('navigate to and renders about page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/about'))
    }
    expect(state.app.controller).toBe('about')
    let app = generateAppHTML(state)
    let about = generateHTML(
      <Provider store={store}>
        <About />
      </Provider>)
    expect(app.indexOf(about) >= 0).toBe(true)
  })

  it('it renders home page with books', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/')),
      book: test_book_state,
    }
    let app = generateAppHTML(state)
    expect(app.indexOf(`<div class="book" data-book-status="${test_book.status}" data-book-id="${test_book.id}">`) > 0).toEqual(true)
  })

  it('navigate to and renders Error page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/notarealpage'))
    }
    expect(state.app.controller).toBe('error')
    expect(state.app.path).toBe('/notarealpage')
    let app = generateAppHTML(state)
    let error = generateHTML(<ErrorMessage state={state}/>)
    expect(app.indexOf(error) >= 0).toBe(true)
  })

  it('navigate to and renders book index page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/book'))
    }
    expect(state.app.controller).toBe('book')
    let app = generateAppHTML(state)
    expect(app.indexOf('filtered-book-list-wrap') >= 0).toBe(true)
  })

  it('navigate to and renders book page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/book/notarealbook'))
    }
    expect(state.app.controller).toBe('book')
    let app = generateAppHTML(state)
    expect(app.indexOf('Book not found') >= 0).toBe(true)
  })

  it('navigate to and renders search page', ()=>{
    let state = {
      ...initial_state,
      app: appReducer(undefined, navigateToPath('/search'))
    }
    expect(state.app.controller).toBe('search')
    let app = generateAppHTML(state)
    expect(app.indexOf('search-wrap') >= 0).toBe(true)
  })

  it('navigates to current path', ()=> {
    const mock_window = {
      location: {
        pathname: '/test'
      }
    }
    let action = navigateToPath(mock_window.location.pathname)
    expect(action.type).toEqual('NAVIGATE_TO_PATH')
    expect(action.path).toEqual('/test')
  })

})

