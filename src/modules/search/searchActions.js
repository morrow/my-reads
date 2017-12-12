// Action creators
export const updateQuery = (query)=> {
  return {
    type: 'UPDATE_QUERY',
    query
  }
}

export const submitQuery = (query)=> {
  return {
    type: 'SUBMIT_QUERY',
    query
  }
}

export const receiveResults = (results)=> {
  return {
    type: 'RECEIVE_RESULTS',
    results
  }
}

export const parseResults = (results)=> {
  if(!results){
    return []
  }
  return results.map((item)=>{
    try {
      return {
          id:           item.id,
          authors:      item.volumeInfo.authors,
          title:        item.volumeInfo.title,
          thumbnail:    item.volumeInfo.imageLinks.thumbnail,
          image:        item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=2'),
          categories:   item.volumeInfo.categories,
          description:  item.volumeInfo.description,
          published:    item.volumeInfo.publishedDate.match(/[0-9]{4}/)[0],
      }
    } catch(e){
      return null
    }
  }).filter(item=>item!==null).filter(item=>{
    let required = ['id', 'authors', 'title', 'image']
    return required.filter(property => item[property] !== undefined).length === required.length
  })
}

// Async Actions
export const fetchResults = (query)=> {
  if(!query || query === ''){
    return function(dispatch){
      dispatch(receiveResults([]))
    }
  }
  const api_key = 'AIzaSyC5O0_uMoif6s6TCqvIEfNS3ox_Q1Xo3f0';
  let url = `https://www.googleapis.com/books/v1/volumes?key=${api_key}&q=${query}&maxResults=30`;
  return function(dispatch){
    dispatch(submitQuery(query))
    return fetch(url).then(res => res.json()).then((json) => {
      let results = parseResults(json.items)
      dispatch(receiveResults(results))
    })
  }
}