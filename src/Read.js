import React, {Component} from 'react';
class Read extends Component{
    onSelectChange = (e, book)=>{
      const shelf = e.target.value
      this.props.onShelfChange(book, shelf)
    }
    render(){
      const readBooks = this.props.books.filter((book)=>book.shelf===this.props.mode)
        return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                readBooks.map((book)=>(
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={book.imageLinks&&{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf} onChange={e=>this.onSelectChange(e, book)}>
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
    )}
}

export default Read