import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import {DebounceInput} from 'react-debounce-input';

class SearchBooks extends Component{
  state = {
    books:[]
  }
  handelQuery = (e)=>{
    const query = e.target.value
    BooksAPI.search(query).then(
      (books) => {
        //console.log(books)
        this.setState(
          ()=>{
            if(!books || (books && books.error))
              books = []
            return {books}
          }
        )
      }
    )
  }
  
  onSelectChange = (e, book)=>{
    const shelf = e.target.value
    //console.log(shelf)
    BooksAPI.get(book.id).then(b=>{
      this.props.onShelfChange(b, shelf)
    })
  }
  getShelf = (book)=>{
    const index = this.props.books.findIndex(x => x.id === book.id)
    if(index===-1) return "none"
    return this.props.books[index].shelf
  }
    render(){
      //console.log(this.state.books[0])
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <DebounceInput minLength={2} debounceTimeout={300} type="text" placeholder="Search by title or author" onChange={this.handelQuery} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.books.map((book)=>(
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={book.imageLinks&&{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                          <select onChange={e=>this.onSelectChange(e, book)} defaultValue={this.getShelf(book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                         {
                         book.authors && book.authors.map((author)=>(
                            <div key={book.id+author}>
                              {author}
                            </div>
                            ))
                        }
                      </div>
                    </div>
                  </li>
                  
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks