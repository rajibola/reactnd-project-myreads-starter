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

  async componentDidMount() {
    const shelvedBooks = await BooksAPI.getAll();
    this.setState({shelvedBooks});
  }

  handleText = (query) => {
    BooksAPI.search(query).then((books) =>
      books ? this.setState({books}) : []
    );

    this.setState({query});
  };

  handleShelf = (id, shelf) => {
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
          const oldBook = this.state.shelvedBooks.find(
            (arr) => arr.id === book.id
          );
          return (
            <Book
              key={book.id}
              data={{...book, shelf: oldBook ? oldBook.shelf : 'none'}}
              change={this.handleShelf}
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
