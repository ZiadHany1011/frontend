import React, { useState, useEffect } from 'react';
import SandwichItem from './SandwichItem';

const SandwichList = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSandwiches();
  }, []);

  const fetchSandwiches = async () => {
    try {
      const response = await fetch('http://localhost:8080/sandwiches');
      if (!response.ok) {
        throw new Error('Failed to fetch sandwiches');
      }
      const data = await response.json();
      setSandwiches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = searchQuery 
        ? `http://localhost:8080/sandwiches/search?query=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:8080/sandwiches';
        
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setSandwiches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      fetchSandwiches(); // Reset to all sandwiches when search is cleared
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="sandwich-list">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search sandwiches by name or description..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      
      {sandwiches.length === 0 ? (
        <div className="no-results">
          <p>No sandwiches found</p>
          {searchQuery && (
            <button onClick={fetchSandwiches} className="reset-search">
              Show All Sandwiches
            </button>
          )}
        </div>
      ) : (
        <div className="sandwiches-grid">
          {sandwiches.map((sandwich) => (
            <SandwichItem key={sandwich.ID} sandwich={sandwich} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SandwichList;
