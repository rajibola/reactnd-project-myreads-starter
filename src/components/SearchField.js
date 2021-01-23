import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import box from '../icons/box.svg';

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
        <div>
          <img src={box} alt='box.svg' />
          <div className='warning-text'>No results found</div>
        </div>
      ) : (
        books.map((book, index) => {
          const oldBook = this.props.homeData.filter(
            (arr) => arr.id === book.id
          );
          if (oldBook) {
            book.shelf = oldBook[0] && oldBook[0].shelf;
          } else {
            return book;
          }
          return <Book key={index} data={book} change={this.handleShelf} />;
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
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(e) => this.handleText(e.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>{this.renderSearchResults()}</ol>
        </div>
      </div>
    );
  }
}

export default SearchField;
