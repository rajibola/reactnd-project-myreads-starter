import React from 'react';
import Book from './Book';

const BookShelf = ({title, data}) => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {data.map(({title, authors, imageURL}) => (
            <li>
              <Book title={title} authors={authors} imageURL={imageURL} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
