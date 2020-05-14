import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  onShelfChange = (book, shelf)=>{
    BooksAPI.update(book, shelf)
    book.shelf = shelf
    this.setState(
      (currentState)=>{
        const index = currentState.books.findIndex(x => x.id === book.id)
        if(index===-1 && shelf!=="none")
          currentState.books.push(book)
        else
          currentState.books[index]=book
        return currentState
      }
    )
  }

  componentDidMount(){
    BooksAPI.getAll().then(
      (books) => {
        this.setState(
          ()=>({
            books
          })
        )
      }
    )
  }
  render() {
    return (
      <div className="app">
          <Route exact path="/search" render={()=>(
            <SearchBooks books={this.state.books} onShelfChange={this.onShelfChange}/>
          )}/>
          <Route exact path="/" render={()=>(
            <ListBooks books={this.state.books} onShelfChange={this.onShelfChange}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
