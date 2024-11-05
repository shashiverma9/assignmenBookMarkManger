import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { login, register, getBookmarks, addBookmark, deleteBookmark } from './services/makeRequest';
import Dashboard from './components/DashBoard';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [bookmarks, setBookmarks] = useState([]);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    if (token) {
      getBookmarks(token).then(setBookmarks);
    }
  }, [token]);

  const handleLogin = (email, password) => {
    login(email, password).then((data) => {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    });
  };

  const handleRegister = (email, password) => {
    register(email, password).then((data) => {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/register" element={<LoginForm handleRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard bookmarks={bookmarks} setBookmarks={setBookmarks} token={token} />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
