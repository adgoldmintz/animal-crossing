import React from "react";
import './SearchBar.css';

const SearchBar = ({ term, handleSearchChange, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit} className="search-form">
      <label>Search</label>
      <input type="text" name={term} onChange={handleSearchChange} />
      <input type="Submit" />
    </form>
  );
};

export default SearchBar;