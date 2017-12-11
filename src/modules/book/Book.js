import React from 'react'
import PropTypes from 'prop-types'
import './Book.css';
import LinkContainer from '../app/link/LinkContainer'
import { book_lists } from '../app/App'
import { slugify } from '../app/appHelpers'

const Book = props => {

    const book_data = props.data
    const description_limit_min = 600
    const description_limit = props.data.show_full_description ? Infinity : description_limit_min

    let image
    if(book_data.status && !props.isListMember){
        image = <img src={book_data.image} alt={book_data.title} />
    } else if(book_data.status && props.isListMember){
        image = <LinkContainer href={`/book/${book_data.id}`}>
            <img src={book_data.thumbnail} alt={book_data.title} />
        </LinkContainer>
    } else {
        image = <img src={book_data.thumbnail} alt={book_data.title} />
    }

    let none_option
    if(book_data.status){
        none_option = <option value='none'> None </option>
    }

    let html = (
        <div className='book' data-test={props.test} data-book-status={book_data.status} data-book-id={book_data.id}>
            <div className='image'>
                {image}
            </div>
            <div className='title'>
                { book_data.status && props.isListMember ?
                    <LinkContainer href={'/book/' + book_data.id}>{book_data.title}</LinkContainer>
                    :
                    <div>{book_data.title}</div>
                }
                </div>
            <div className='authors'>
                { book_data.authors && book_data.authors.filter((a, i)=>i<3).map((author)=>
                    <div key={author} className='author' title={author}>{author}</div>
                )}
                { book_data.authors && book_data.authors.length > 3 &&
                    <div className='author' title={book_data.authors.filter((a,i)=>i>3).join(', ')}> ... </div>
                }
            </div>
            <div className='published'>
                {book_data.published}
            </div>
            { book_data.categories &&
                <div className='categories'>
                    {book_data.categories.map((category)=>
                        <div key={category} className='category'>{category}</div>
                    )}
                </div>
            }
            <div className='actions'>
                <select
                    data-book-id={props.data.id}
                    onChange={props.onChange}
                    value={book_data.status}>
                    <option value='none' defaultValue> -- select an option -- </option>
                    { none_option }
                    { book_lists.map((list)=>
                        <option key={list} value={slugify(list)}>{list}</option>
                    )}
                </select>
                { book_data.status && props.isListMember &&
                    <span className='checkmark' role='img' aria-label='checkmark'>✓</span>
                }
            </div>
            { book_data.description &&
                <div className='description'>
                    {book_data.description.slice(0, description_limit)}
                    {book_data.description.length > description_limit &&
                        <span>...</span>
                    }
                    {book_data.description.length > description_limit_min &&
                        <button
                            className='button'
                            onClick={props.toggleFullDescription}
                            >
                            Show {props.data.show_full_description ? 'less' : 'more'} description
                        </button>
                    }
                </div>
            }
        </div>
    )
    if(props.isListMember){
        return html
    } else {
        return (
            <div id='book'>
                {html}
            </div>
        )
    }
}

Book.propTypes = {
    data: PropTypes.shape({
        id:           PropTypes.string.isRequired,
        authors:      PropTypes.array.isRequired,
        title:        PropTypes.string.isRequired,
        image:        PropTypes.string.isRequired,
        published:    PropTypes.string.isRequired,
        categories:   PropTypes.array,
        description:  PropTypes.string,
        show_full_description: PropTypes.bool
    })
}

export default Book;