import React from "react";

const SearchBar = ({ term, handleSearchChange, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <label>Search</label>
      <input type="text" name={term} onChange={handleSearchChange} />
      <input type="Submit" />
    </form>
  );
};

export default SearchBar;
