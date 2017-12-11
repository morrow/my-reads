import { combineReducers } from 'redux'
import appReducer, { initial_state as app_state } from './modules/app/appReducer'
import bookReducer, { initial_state as book_state } from './modules/book/bookReducer'
import searchReducer, { initial_state as search_state } from './modules/search/searchReducer'

const myReadsApp = combineReducers({
  app: appReducer,
  book: bookReducer,
  search: searchReducer
})

export const initial_state = {
  app:app_state,
  book:book_state,
  search:search_state
}

export default myReadsApp
