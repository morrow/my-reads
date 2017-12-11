import './Search.css'
import React from 'react';
import BookContainer from '../book/BookContainer'

const Search = (props) => {
  let results
  if(props.state.results.length && !props.state.fetching){
    results = props.state.results.map(item=>
      <BookContainer key={item.id} data={item} isListMember />
    )
  } else if(props.state.fetching){
     results = <div className='fetching'>Fetching Results...</div>
  }
  return (
    <div id='search-wrap'>
      <h1>Search</h1>
      <form id='search' onSubmit={props.onSubmit}>
        <input
          type='search'
          id='query'
          name='query'
          autoFocus={true}
          defaultValue={props.state.query}
          onChange={props.onChange.bind(this)} />
        &nbsp;
        <input type='submit' value='Search' />
      </form>
      <div id='results' className='books'>
        {results}
      </div>
    </div>
  );
}

export default Search;
