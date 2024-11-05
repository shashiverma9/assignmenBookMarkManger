import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';  // Reusable component to display each bookmark
import { addBookmark, deleteBookmark } from '../services/makeRequest';

const Dashboard = ({ bookmarks, setBookmarks, token }) => {
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddBookmark = async () => {
    if (!newUrl) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const newBookmark = await addBookmark(token, newUrl);
      setBookmarks([...bookmarks, newBookmark]);
      setNewUrl('');  // Clear input field after success
    } catch (err) {
      setError('Failed to add bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(token, id);
      setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
    } catch (err) {
      setError('Failed to delete bookmark. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Bookmark Manager</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Enter URL to add"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button onClick={handleAddBookmark} disabled={loading}>
          {loading ? 'Adding...' : 'Add Bookmark'}
        </button>
      </div>

      <div className="bookmarks-list">
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet. Add some!</p>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              handleDelete={handleDeleteBookmark}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
