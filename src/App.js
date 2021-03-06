import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';
import SearchField from './components/SearchField.js';
import books from './icons/books.svg';

const categories = ['Currently Reading', 'Want to Read', 'Read'];

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({books});
  }

  updateShelf = async (id, shelf) => {
    await BooksAPI.update(id, shelf);
    const newItem = await BooksAPI.get(id);

    this.setState((oldArray) => ({
      books: [...oldArray.books.filter((data) => data.id !== id), {...newItem}],
    }));
  };

  changeShelf = (id, shelf) => {
    let item = this.state.books.find((data) => data.id === id);
    this.setState((oldArray) => ({
      books: [
        ...oldArray.books.filter((data) => data.id !== id),
        {...item, shelf: shelf},
      ],
    }));

    BooksAPI.update(id, shelf);
  };

  render() {
    return (
      <div className='app'>
        <div className='list-books-title'>
          <img src={books} alt='books.svg' />
          <h1>MyReads</h1>
        </div>
        <Route
          path='/search'
          render={() => <SearchField changeShelf={this.updateShelf} />}
        />

        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-content'>
                <div>
                  {categories.map((category) => (
                    <BookShelf
                      title={category}
                      data={this.state.books}
                      changeShelf={this.changeShelf}
                      key={category}
                    />
                  ))}
                </div>
              </div>
              <Link to='/search' className='open-search'>
                <div />
              </Link>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
