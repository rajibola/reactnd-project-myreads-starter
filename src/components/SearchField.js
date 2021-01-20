import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchField extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      query: '',
    };
  }

  handleText = (query) => {
    BooksAPI.search(query).then((books) =>
      books ? this.setState({books}) : []
    );

    this.setState({query});
  };

  handleShelf = (id, shelf) => {
    BooksAPI.update(id, shelf);
    this.props.updateLocal(id);
  };

  renderSearchResults() {
    const {books, query} = this.state;

    if (query) {
      return books.error ? (
        <div>No results found</div>
      ) : (
        books.map((book, index) => {
          return (
            <Book
              key={index}
              data={book}
              change={this.handleShelf}
              // handleBookShelf={this.handleBookShelf.bind(this)}
            />
          );
        })
      );
    }
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(e) => this.handleText(e.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>{this.renderSearchResults()}</ol>
          {this.state.query}
        </div>
      </div>
    );
  }
}

export default SearchField;
