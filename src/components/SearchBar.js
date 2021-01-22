import React from 'react';
import '../styles/searchbar.css';

const SearchBar = ({
	lang,
	handleChange,
	searchTerm,
	setLang,
	setHemisphere,
	hemisphere,
}) => {
	const languages = [
		{ code: 'USen', text: 'English' },
		{ code: 'JPja', text: 'Japanese' },
	];

	const hemispheres = ['northern', 'southern'];

	return (
		<div className='lang-search-wrapper'>
			<div className='control-wrapper'>
				<div className='language-wrapper'>
					<span className='title-wrapper'>
						<h2>Language</h2>
					</span>
					<p>
						Choose if you'd like to see critter names in English or Japanese.
					</p>

					<form>
						<div onChange={setLang}>
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

				<div className='language-wrapper'>
					<span className='title-wrapper'>
						<h2>Hemisphere</h2>
					</span>
					<p>Select your hemisphere.</p>

					<form>
						<div onChange={setHemisphere}>
							{hemispheres.map((hemi, i) => (
								<label style={{ marginRight: '50px' }} key={i}>
									<input
										type='radio'
										value={hemi}
										defaultChecked={hemisphere === hemi}
										name='hemisphere'
										style={{ marginRight: '5px', backgroundColor: 'red' }}
									/>
									{`${hemi[0].toUpperCase()}${hemi.slice(1)}`}
								</label>
							))}
						</div>
					</form>
				</div>
				<div className='search-form'>
					<span className='title-wrapper'>
						<h2>Search for Critters</h2>
					</span>
					<p>Dynamically search for critters by name.</p>
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
