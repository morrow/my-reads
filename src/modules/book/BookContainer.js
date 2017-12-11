import { connect } from 'react-redux'
import Book from './Book'
import { addBook, updateBookStatusById, toggleFullDescription } from './bookActions'
import { deepCopy } from '../app/appHelpers'
import { navigateToPath } from '../app/appActions'

export const mapStateToProps = (state, ownProps) => {
  let data = deepCopy(ownProps.data)
  let book = state.book.books.find(b=>b.id===ownProps.data.id)
  if(book && data.status === undefined){
    data = {
      ...data,
      status: book.status,
      show_full_description: book.show_full_description,
    }
  }
  return { data }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(addBook(ownProps.data))
      dispatch(updateBookStatusById(e.target.dataset.bookId, e.target.value))
      if(e.target.value == 'none' && !ownProps.isListMember){
        dispatch(navigateToPath('/'))
      }
    },
    toggleFullDescription: (e)=> {
      dispatch(toggleFullDescription(ownProps.data))
    }
  }
}

const BookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Book)

export default BookContainer