import { connect } from 'react-redux'
import { updateQuery, fetchResults } from './searchActions'
import Search from './Search'

export const mapStateToProps = (state, ownProps) => {
  return {
    state: state.search
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(updateQuery(e.target.value))
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