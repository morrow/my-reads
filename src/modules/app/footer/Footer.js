import React from 'react';
import LinkContainer from '../link/LinkContainer'

const Footer = (props)=> {
  return (
    <footer>
        <LinkContainer href='/about'>About</LinkContainer>
        <a target='_blank' href='https://github.com/morrow/my-reads-app'>Github</a>
        { props.state.book.books.length > 0 &&
          <button id='reset' onClick={props.onClick}>Reset</button>
        }
    </footer>
  )
}

export default Footer;
