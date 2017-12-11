import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Footer from './Footer'
import FooterContainer from './FooterContainer'
import { Provider } from 'react-redux'
import { navigateToPath } from '../appActions'
import { initial_state as initial_app_state } from '../../../reducers'
import { createStore } from 'redux'
import { mapStateToProps, mapDispatchToProps } from './FooterContainer'
import appReducer from '../appReducer'
import { store } from '../../../index'

describe('container functions', ()=>{

  it('render', ()=>{
    ReactDOM.render(
      <Provider store={store}>
        <FooterContainer />
      </Provider>, document.createElement('div'))
  })

  it('maps props to state', ()=>{
    expect(mapStateToProps({}).state).toEqual({})
  })

  it('maps dispatch to props', ()=> {
    let expected_actions = [
      {
        type: 'RESET_STATE'
      },
      {
        type: 'NAVIGATE_TO_PATH',
        path:'/',
      }
    ]
    const dispatch = (action)=> {
      // action should be expected
      expect(expected_actions.filter((a)=>a.type == action.type).length).toBe(1)
      // compare expected action with action received
      let comparison = expected_actions.filter((a)=>a.type == action.type)[0]
      expect(action).toEqual(comparison)
      // remove action from expected actions
      expected_actions = expected_actions.filter((a)=>a.type!==action.type)
    }
    // all expected actions were performed
    const props = {}
    window.location = {
      pathname: 'test'
    }
    // Confirm is false, dispatch should not run
    window.confirm = ()=> false
    mapDispatchToProps(dispatch, props).onClick()
    expect(expected_actions.length).toBe(2)
    // Confirm is true, dispatch should run
    window.confirm = ()=> true
    mapDispatchToProps(dispatch, props).onClick()
    expect(expected_actions.length).toBe(0)
  })

})
