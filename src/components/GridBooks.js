import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

/**
* @description The component that represents a grid of books
* @param {array} books
* @param {function} onUpdateBook
*/
class GridBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    render() {
        const { books, onUpdateBook } = this.props
        if (books instanceof Array) books.sort(sortBy("title"))
        return (
            <div>
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
        );
    }
}

export default GridBooks
