import React from 'react';

const SearchBar = ({ handleChange, searchTerm }) => {
	return (
		<div className='search-form'>
			<span className='title-style'>
				<h2>Search for Critters</h2>
			</span>
			<input value={searchTerm} onChange={handleChange}></input>
		</div>
	);
};

export default SearchBar;
