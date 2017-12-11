// import {
//   ADD_BOOK,
//   REMOVE_BOOK,
//   UPDATE_BOOK_STATUS,
//   TOGGLE_FULL_DESCRIPTION
// } from './bookActions'

export const initial_state = {
  books: [],
}

const bookReducer = (state = initial_state, action) => {

  const actions = {
    ADD_BOOK: () => {
      let books = state.books.filter(b => b.id !== action.book.id)
      books.push(action.book)
      return {
        ...state,
        books
      }
    },
    REMOVE_BOOK: () => {
      let books = state.books.filter(b => b.id !== action.book.id)
      return {
        ...state,
        books
      }
    },
    UPDATE_BOOK_STATUS: () => {
      let books = state.books.map(b=> {
        if(b.id === action.id){
          return {
            ...b,
            status: action.status
          }
        }
        return b
      }).filter(b=>b.status !== 'none')
      return {
        ...state,
        books
      }
    },
    TOGGLE_FULL_DESCRIPTION: () => {
      return {
        ...state,
        books: state.books.map(b => {
          if(b.id === action.book.id){
            return {
              ...b,
              show_full_description: !!!b.show_full_description
            }
          } else {
            return b
          }
        })
      }
    },
    RESET_STATE: () => {
      return initial_state
    }
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default bookReducer