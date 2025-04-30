import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import InfiniteGallery from './Components/InfiniteGallery';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const user = {
    name: 'John Doe', // Mock user data
    profilePic: '', // Add a URL for the profile picture if available
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger search functionality in InfiniteGallery
    setSearchQuery(searchQuery);
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <header className="header">
        <h1>MK Gallery</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        <nav>
          <Link to="/">Gallery</Link>
          {isLoggedIn && (
            <div className="profile-container">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="profile-icon"
                  onClick={() => setShowProfileCard((prev) => !prev)} // Toggle profile card
                />
              ) : (
                <div
                  className="profile-icon-placeholder"
                  onClick={() => setShowProfileCard((prev) => !prev)} // Toggle profile card
                >
                  <i className="fas fa-user"></i>
                </div>
              )}
              {showProfileCard && (
                <div className="profile-card">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="profile-card-pic"
                    />
                  ) : (
                    <div className="profile-card-pic-placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  <p className="profile-card-name">{user.name}</p>
                  <button
                    className="logout-button"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShowProfileCard(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <InfiniteGallery searchQuery={searchQuery} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
