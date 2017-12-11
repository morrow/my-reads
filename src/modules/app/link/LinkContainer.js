import { connect } from 'react-redux'
import { getContainingElement } from '../appHelpers'
import { navigateToPath } from '../appActions'
import Link from './Link'

export const mapStateToProps = (state, ownProps) => {
  return { state }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      e.preventDefault()
      let path = getContainingElement(e.target, 'A').getAttribute('href')
      if(!!!path){
        path = e.target.parentNode.getAttribute('href')
      }
      dispatch(navigateToPath(path))
      return false
    }
  }
}

const LinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default LinkContainer