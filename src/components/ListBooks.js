import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

/**
* @description The component that represents a book list with shelf title and filter
* @param {string} title
* @param {array} books
* @param {function} onUpdateBook
*/
class ListBooks extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    render() {
        const { title, books, onUpdateBook } = this.props
        if (books instanceof Array) books.sort(sortBy("title"))
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onUpdateBook={onUpdateBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default ListBooks
