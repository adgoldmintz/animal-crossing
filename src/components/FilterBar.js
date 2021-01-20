import React, { useState } from 'react';
import '../styles/filterbar.css';

const FilterBar = ({
	getCreatures,
	setLang,
	searchChange,
	searchTerm,
	lang,
}) => {
	const types = ['bugs', 'fish', 'sea'];
	const languages = [
		{ code: 'USen', text: 'E' },
		{ code: 'JPja', text: 'JP' },
	];

	//handle style changes to active button
	//TODO: Update colors. Red is a placeholder
	const [critterType, setActiveCritter] = useState(types[0]);
	const [langType, setActiveLang] = useState(lang);

	const colors = { yellow: '254, 203, 77', text: '92, 85, 60' };
	const activeBtn = {
		backgroundColor: `rgb(${colors.yellow})`,
		color: '#FFFFFF',
	};

	return (
		<>
			<div className='filters-bar'>
				<div className='line'></div>

				{/* Species Filters */}
				<div className='species'>
					{types.map((type, i) => (
						<div key={type} className='btn-wrapper'>
							{critterType === type ? (
								<div className='tooltip'>{type}</div>
							) : null}

							<button
								style={critterType === type ? activeBtn : null}
								key={type}
								value={type}
								onClick={(e) => {
									getCreatures(e);
									setActiveCritter(types[i]);
								}}>
								<img
									className='filter-icon'
									src={require(`../assets/${type}.png`)}
									alt={`${type} icon`}
								/>
							</button>
						</div>
					))}
				</div>
				{/* Language Toggle 
				<div className='languages'>
					{languages.map(({ code, text }, i) => (
						<button
							key={text}
							value={code}
							onClick={(e) => {
								setLang(e);
								setActiveLang(code);
							}}
							style={langType === code ? activeBtn : null}>
							{text}
						</button>
					))}
				</div>
				*/}
			</div>
		</>
	);
};

export default FilterBar;
