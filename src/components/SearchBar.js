import React, { useState } from 'react';
import '../styles/searchbar.css';

const SearchBar = ({ lang, handleChange, searchTerm, setLang }) => {
	const [langType, setActiveLang] = useState(lang);

	const languages = [
		{ code: 'USen', text: 'English' },
		{ code: 'JPja', text: 'Japanese' },
	];

	return (
		<div className='lang-search-wrapper'>
			<div className='control-wrapper'>
				<div className='language-wrapper'>
					<span className='title-style'>
						<h2>Select Language</h2>
					</span>
					<p>
						Choose if you'd like to see critter names in English or Japanese.
					</p>
					<form>
						<div className='lang-input' onChange={setLang}>
							{languages.map(({ code, text }, i) => (
								<label style={{ marginRight: '50px' }} key={i}>
									<input
										type='radio'
										value={code}
										defaultChecked={lang === code}
										name='language'
										style={{ marginRight: '5px', backgroundColor: 'red' }}
									/>
									{text}
								</label>
							))}
						</div>
					</form>
				</div>
				<div className='search-form'>
					<span className='title-style'>
						<h2>Search for Critters</h2>
						<p>Dynamically search for critters by name.</p>
					</span>
					<br />

					<input
						placeholder='Start searching!'
						value={searchTerm}
						onChange={handleChange}></input>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
