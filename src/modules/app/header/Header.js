import React from 'react';
import LinkContainer from '../link/LinkContainer'

const Header = (props)=> {
  return (
    <header>
      <nav>
        <LinkContainer href='/' className='logo'>My Reads App</LinkContainer>
        <LinkContainer href='/search' className='search button'>
          <span role='img' aria-label='magnifying-glass'>🔎</span>
          Search for a book
        </LinkContainer>
      </nav>
    </header>
  )
}

export default Header;
