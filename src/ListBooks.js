import React, {Component} from 'react';
import Read from './Read';
import {Link} from 'react-router-dom';
class ListBooks extends Component{
    render(){
        return (
            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div> 
                <Read books={this.props.books} mode="currentlyReading" title="Currently Reading" onShelfChange={this.props.onShelfChange}/>
                <Read  books={this.props.books} mode="wantToRead" title="Want to Read" onShelfChange={this.props.onShelfChange}/>
                <Read  books={this.props.books} mode="read" title="Read" onShelfChange={this.props.onShelfChange}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
            </div>
            </div>
        )
    }
}

export default ListBooks;