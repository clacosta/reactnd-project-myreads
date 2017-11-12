import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GridBooks from './GridBooks'

/**
* @description The component that represents the book search screen
* @param {string} query
* @param {array} booksFound
* @param {function} onSearchBook
* @param {function} onUpdateBook
*/
class Search extends Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        booksFound: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    render() {
        const { query, booksFound, onSearchBook, onUpdateBook } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => onSearchBook(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <GridBooks
                        books={booksFound}
                        onUpdateBook={onUpdateBook}
                    />
                </div>
            </div>
        );
    }
}

export default Search
