import React from 'react';

const BookmarkCard = ({ bookmark, handleDelete }) => {
  return (
    <div className="bookmark-card">
      <img src={bookmark.previewImage} alt={bookmark.title} />
      <h3>{bookmark.title}</h3>
      <p>{bookmark.description}</p>
      <p><strong>Tags:</strong> {bookmark.tags.join(', ')}</p>
      <button onClick={() => handleDelete(bookmark._id)}>Delete</button>
    </div>
  );
};

export default BookmarkCard;
