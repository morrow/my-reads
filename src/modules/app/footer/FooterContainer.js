import { connect } from 'react-redux'
import Footer from './Footer'
import { resetState, navigateToPath } from '../appActions'

export const mapStateToProps = (state, ownProps) => {
  return { state }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      if(window.confirm('Really reset everything? This will start over from scratch. Cannot undo.')){
        dispatch(resetState())
        dispatch(navigateToPath(window.location.pathname))
      }
    }
  }
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterContainer