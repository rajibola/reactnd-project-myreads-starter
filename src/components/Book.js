import React from 'react';

const Book = ({data, change}) => {
  const {id, title, authors, imageLinks} = data;

  const imageThumb = imageLinks ? imageLinks.smallThumbnail : null;

  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageThumb})`,
          }}
        />
        <div className='book-shelf-changer'>
          <select
            value={data.shelf}
            onChange={(event) => {
              change(id, event.target.value);
            }}
          >
            <option value='move' disabled>
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
      {authors &&
        authors.map((author) => (
          <div key={author} className='book-authors'>
            {author}
          </div>
        ))}
    </div>
  );
};

export default Book;
