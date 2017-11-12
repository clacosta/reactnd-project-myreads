import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    booksFound: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  /**
  * @description Updates the shelf a book in the back-end API and IDE
  * @param {object} book
  * @param {string} shelf
  */
  updateBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    this.setState(state => ({
      books: state.books.concat([book])
    }))
    BooksAPI.update(book, shelf).then()
  }
  /**
  * @description Checks the list of books returned by the search and marks the correct shelf according to the list of user books
  * @param {array} booksFound
  */
  checkBooks = (booksFound) => {
    if (booksFound instanceof Array) {
      for (const bookFound of booksFound) {
        bookFound.shelf = 'none'
        for (const book of this.state.books) {
          if (bookFound.id === book.id) {
            bookFound.shelf = book.shelf
            continue;
          }
        }
      }
      this.setState({ booksFound })
    }
  }
  /**
  * @description Search for books in the backend API according to the query
  * @param {string} query
  */
  searchBook = (query) => {
    this.setState({ query: query.trimLeft() })
    BooksAPI.search(query, 20).then((books) => (
      this.checkBooks(books)
    )).catch(
      this.setState({ booksFound: [] })
      )
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  title="Currently Reading"
                  books={this.state.books.filter((b) => b.shelf === "currentlyReading")}
                  onUpdateBook={this.updateBook}
                />
                <ListBooks
                  title="Want to Read"
                  books={this.state.books.filter((b) => b.shelf === "wantToRead")}
                  onUpdateBook={this.updateBook}
                />
                <ListBooks
                  title="Read"
                  books={this.state.books.filter((b) => b.shelf === "read")}
                  onUpdateBook={this.updateBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search
            query={this.state.query}
            booksFound={this.state.booksFound}
            onSearchBook={this.searchBook}
            onUpdateBook={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
