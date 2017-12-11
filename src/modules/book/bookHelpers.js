export const getCurrentBook = (state) => {
  return state.book.books.filter(b => b.id === state.app.id)[0]
}

export const createMockBook = (obj)=> {
  let book = {
    id: 'a',
    title: 'Test Book',
    authors: ['Test Author'],
    image: '',
    published: ''
  }
  for(let key in obj){
    book[key] = obj[key]
  }
  return book
}