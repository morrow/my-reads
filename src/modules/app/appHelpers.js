import { controllers } from './App'
import ReactDOM from 'react-dom'

export const getControllerFromPath = (path) => {
  if(path == undefined){
    return 'error'
  }
  let paths = path.split('/').filter(p=> p !== '')
  let controller
  if(paths.length === 0){
    controller = 'home'
  } else {
    controller = paths[0]
  }
  if(controller in controllers){
    return controller
  } else {
    return 'error'
  }
}

export const slugify = (input)=> input.replace(/ /g, '-').toLowerCase()

export const getIDFromPath = (path) => {
  if(path == undefined){
    return null
  }
  let paths = path.split('/').filter(p=> p !== '')
  if(paths.length === 2){
    return paths[1]
  }
  return null
}

export const deepCopy = (obj)=> JSON.parse(JSON.stringify(obj))

export const generateHTML = (jsx)=>{
  let ele = document.createElement('div')
  ReactDOM.render(jsx, ele)
  return ele.innerHTML
}

export const getContainingElement = (element, nodename)=>{
  if(element.nodeName === nodename){
    return element
  } else {
    return getContainingElement(element.parentNode, nodename)
  }
}