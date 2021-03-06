import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Link from './Link'
import LinkContainer from './LinkContainer'
import { Provider } from 'react-redux'
import { navigateToPath } from '../appActions'
import { initial_state as initial_app_state } from '../../../reducers'
import { createStore } from 'redux'
import { generateHTML } from '../appHelpers'
import { mapStateToProps, mapDispatchToProps } from './LinkContainer'
import appReducer from '../appReducer'
import { store } from '../../../index'

describe('container functions', ()=>{

  it('it renders a link', ()=>{
    let link = generateHTML(
      <Provider store={store}>
        <LinkContainer href='/test-href'>test body</LinkContainer>
      </Provider>)
    expect(link).toEqual('<a href="/test-href">test body</a>')
  })

  let default_was_prevented

  const testClick = (event, expected_path)=>{
    const dispatch = (action)=> {
      expect(action).toEqual({
        type: 'NAVIGATE_TO_PATH',
        path: expected_path
      })
    }
    const props = {}
    default_was_prevented = false
    mapDispatchToProps(dispatch, props).onClick(event)
    expect(default_was_prevented).toBe(true)
  }



  it('maps props to state', ()=>{
    expect(mapStateToProps({}).state).toEqual({})
  })

  it('navigates when clicked', ()=> {
    let link = document.createElement('a')
    link.href = 'test'
    let mock_event = {
      preventDefault: ()=>{
        default_was_prevented = true
      },
      target: link
    }
    testClick(mock_event, 'test')
  })

  it('navigates when child element is clicked', ()=> {
    let link = document.createElement('a')
    link.href = 'image-test'
    let img = document.createElement('img')
    link.appendChild(img)
    let mock_event = {
      preventDefault: ()=>{
        default_was_prevented = true
      },
      target: img
    }
    testClick(mock_event, 'image-test')
  })

})
