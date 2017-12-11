export const resetState = ()=>{
  return {
    type: 'RESET_STATE'
  }
}

export const navigateToPath = (path)=> {
  return {
    type: 'NAVIGATE_TO_PATH',
    path
  }
}