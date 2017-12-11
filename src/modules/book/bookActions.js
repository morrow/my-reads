// Action constants
export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK_STATUS = 'UPDATE_BOOK_STATUS'
export const TOGGLE_FULL_DESCRIPTION = 'TOGGLE_FULL_DESCRIPTION'

// Action creators
export const addBook = (book)=> {
  return {
    type: ADD_BOOK,
    book
  }
}

export const removeBook = (book)=>{
  return {
    type: REMOVE_BOOK,
    book
  }
}

export const updateBookStatusById = (id, status)=> {
  return {
    type: UPDATE_BOOK_STATUS,
    status: status,
    id,
  }
}

export const toggleFullDescription = (book)=>{
  return {
    type: TOGGLE_FULL_DESCRIPTION,
    book
  }
}