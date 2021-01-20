import React from 'react';

const Book = ({title, authors, imageURL, change}) => {
  console.log('HELLO', change);
  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageURL})`,
          }}
        />
        <div className='book-shelf-changer'>
          <select
            onChange={(event) => {
              change(title, event.target.value.toLowerCase());
              event.preventDefault();
            }}
          >
            <option value='move' disabled selected='true'>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      {authors.map((author) => (
        <div key={author} className='book-authors'>
          {author}
        </div>
      ))}
    </div>
  );
};

export default Book;
