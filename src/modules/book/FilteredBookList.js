import React from 'react';
import BookContainer from './BookContainer'
import LinkContainer from '../app/link/LinkContainer'

const FilteredBookList = (props)=> {
  const books = props.books.filter(b=>b.status===props.filter || props.filter === 'all')
  return (
    <div className='filtered-book-list-wrap books'>
      <h2 className='filtered-book-list-title'>
        <LinkContainer href={`/list/${props.filter}`}>
          {props.filter.replace(/-/g, ' ')}
        </LinkContainer>
      </h2>
      { books.length ?
        <div className='filtered-book-list-books'>
          { books.map(book=>
            <BookContainer key={book.id} data={book} isListMember />
          )}
          <div className='filter-book-list-add-book book'>
            <LinkContainer href='/search'>+ Add a book</LinkContainer>
          </div>
        </div>
        :
        <div className='filter-book-list-add-book'>
          <LinkContainer href='/search' className='button'>Add a book</LinkContainer> to this list
        </div>
      }
    </div>
  )
}

export default FilteredBookList;
