import React from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';
import SearchField from './components/SearchField';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));

      console.log(books);
    });
  }

  changeShelf = (name, shelf) => {
    let newArray = this.state.books.filter(({title}) => title !== name);
    let item = this.state.books.find(({title}) => title === name);
    this.setState(() => ({
      books: [...newArray, {...item, shelf: shelf}],
    }));

    console.log('FUNCTION RAN');
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
                  <BookShelf
                    title='Currently Reading'
                    data={this.state.books}
                    changeShelf={this.changeShelf}
                  />
                  <BookShelf
                    title='Want to Read'
                    data={this.state.books}
                    changeShelf={this.changeShelf}
                  />
                  <BookShelf
                    title='Read'
                    data={this.state.books}
                    changeShelf={this.changeShelf}
                  />
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
