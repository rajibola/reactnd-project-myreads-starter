import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import box from '../icons/box.svg';

class SearchField extends React.Component {
  constructor() {
    super();
    this.state = {
      shelvedBooks: [],
      books: [],
      query: '',
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((shelvedBooks) => {
      this.setState(() => ({
        shelvedBooks,
      }));
    });
  }

  handleText = (query) => {
    BooksAPI.search(query).then((books) =>
      books ? this.setState({books}) : []
    );

    this.setState({query});
  };

  handleShelf = (id, shelf) => {
    // this.props.updateLocal(id);
    this.props.changeShelf(id, shelf);
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
          const oldBook = this.state.shelvedBooks.filter(
            (arr) => arr.id === book.id
          );
          if (oldBook) {
            book.shelf = oldBook[0] && oldBook[0].shelf;
          }
          if (!oldBook.length) {
            book.shelf = 'none';
          }
          return <Book key={index} data={book} change={this.handleShelf} />;
        })
      );
    } else {
      BooksAPI.getAll().then((shelvedBooks) => {
        this.setState(() => ({
          shelvedBooks,
        }));
      });
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
