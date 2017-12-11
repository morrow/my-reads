import { connect } from 'react-redux'
import { updateQuery, fetchResults } from './searchActions'
import { waitThenPerform } from '../app/appHelpers'
import Search from './Search'

export const mapStateToProps = (state, ownProps) => {
  return {
    state: state.search
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      let query = e.target.value
      let delay = query === '' ? 0 : 500
      dispatch(updateQuery(query))
      waitThenPerform('fetch', ()=>{
        dispatch(fetchResults(query))
      }, delay)
    },
    onSubmit: (e) => {
      e.preventDefault()
      dispatch(fetchResults(e.target.query.value))
      return false
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer