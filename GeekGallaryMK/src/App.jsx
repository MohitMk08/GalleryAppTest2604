import React, { useState } from 'react';
import './App.css';
import InfiniteGallery from './Components/InfiniteGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger search functionality in InfiniteGallery
    setSearchQuery(searchQuery);
  };

  return (
    <div>
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
      </header>
      <InfiniteGallery searchQuery={searchQuery} />
    </div>
  );
}

export default App;