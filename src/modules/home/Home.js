import React from 'react';
import FilteredBookList from '../book/FilteredBookList'
import { book_lists } from '../app/App'
import LinkContainer from '../app/link/LinkContainer'

const Home = (props)=> {
  return (
    <div id='home'>
      { props.state.book.books.length ?
        <div>
          { book_lists.map(list=>
            <FilteredBookList key={list} books={props.state.book.books} filter={list.toLowerCase().replace(/ /g, '-')} />
          )}
        </div>
        :
        <div className='welcome-message'>
          <h1>Welcome to the My Reads App!</h1>
          <p>No Books added yet. <LinkContainer href='/search' className='button'>Search</LinkContainer> for a book to add.</p>
        </div>
      }
    </div>
  )
}

export default Home;
