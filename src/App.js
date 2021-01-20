import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';
import SearchField from './components/SearchField.js';

const categories = ['Currently Reading', 'Want to Read', 'Read'];

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));

      console.log(books);
    });
  }

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
        <Route path='/search' component={SearchField} />

        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
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
                <button>Add a book</button>
              </Link>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
