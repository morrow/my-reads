import React from 'react'
import LinkContainer from '../app/link/LinkContainer'

const About = (props)=> {
  return (
    <div id='about'>
      <h1>About</h1>
      <p>This is an app built using react for Udacity's React course. The purpose of this app is to allow you to keep a catalog of books you want to read, are currently reading, and have aready read. The app uses Google Books API to enable users to search for a specific book title to add to their collection. Data is stored locally using the HTML5 localStorage API.</p>
      <LinkContainer className='button' href='/search'>Search for a book</LinkContainer> to get started.
    </div>
  )
}

export default About
