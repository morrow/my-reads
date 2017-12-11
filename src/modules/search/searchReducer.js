export const initial_state = {
  query: '',
  fetching: false,
  results: [],
}

const searchReducer = (state = initial_state, action) => {
  const actions = {
    'UPDATE_QUERY': () => {
      return {
        ...state,
        query: action.query
      }
    },
    'SUBMIT_QUERY': () => {
      return {
        ...state,
        fetching:true,
      }
    },
    'RECEIVE_RESULTS': () => {
      return {
        ...state,
        fetching: false,
        results: action.results
      }
    },
    'RESET_STATE': () => {
      return initial_state
    }
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default searchReducer