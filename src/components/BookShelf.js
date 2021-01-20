import React from 'react';
import Book from './Book';

const BookShelf = ({title, data, changeShelf}) => {
  const filteredData = data.filter(
    ({shelf}) =>
      shelf.toLowerCase() ===
      title
        .toLowerCase()
        .split(' ')
        .join('')
  );

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {filteredData.map((data) => (
            <li key={data.id}>
              <Book data={data} change={changeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
