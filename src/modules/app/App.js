import React, { Component } from 'react'
import Home from '../home/Home'
import Header from './header/Header'
import FooterContainer from './footer/FooterContainer'
import About from '../about/About'
import ErrorMessage from './ErrorMessage'
import SearchContainer from '../search/SearchContainer'
import BookContainer from '../book/BookContainer'
import LinkContainer from './link/LinkContainer'
import FilteredBookList from '../book/FilteredBookList'
import { getCurrentBook } from '../book/bookHelpers'
import { slugify } from './appHelpers'
import './App.css';

export const book_lists = [
  'Want To Read',
  'Currently Reading',
  'Read'
]

const bookController = (state)=> {
  if(state.app.id){ // get book from state
    let book = getCurrentBook(state)
    if(book){
      return <BookContainer data={book} />
    } else {
      return errorController(state, 'Book not found')
    }
  }
  else { // show index of books
    return <FilteredBookList books={state.book.books} filter='all' />
  }
}

const listController = (state)=>{
  if(state.app.id){
    return <FilteredBookList books={state.book.books} filter={state.app.id} />
  } else {
    return (
      <div className='lists'>
        {book_lists.map(list => <LinkContainer className='list' href={`/list/${slugify(list)}`}>{list}</LinkContainer>)}
      </div>
    )
  }
}

const homeController = (state)=> {
  return <Home state={state} />
}

const searchController = (state)=> {
  return <SearchContainer />
}

const errorController = (state, message)=>{
  return <ErrorMessage message={message} />
}

const aboutController = ()=> {
  return <About />
}

export const controllers = {
  home: homeController,
  search: searchController,
  error: errorController,
  book: bookController,
  list: listController,
  about: aboutController,
}

const route = (state)=>{
  if(state.app.controller in controllers){
    return controllers[state.app.controller](state)
  } else {
    return errorController(state, `No valid route found for: '${state.app.controller}'`)
  }
}

class App extends Component {
  render(state) {
    return (
      <div id='wrap'>
        <Header />
        <main>
          { this.props.state.app.controller !== 'home' &&
            <div className='back-to-home'>
              <LinkContainer href='/'>← Back to home</LinkContainer>
            </div>
            }
          {route(this.props.state)}
        </main>
        <FooterContainer />
      </div>
    )
  }
}

export default App;
