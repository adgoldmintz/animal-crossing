import React, { useState } from 'react';
import '../styles/filterbar.css';

const FilterBar = ({ getCreatures }) => {
	const types = [
		{ label: 'bugs', icon: 'bug' },
		{ label: 'fish', icon: 'fish' },
		{ label: 'sea', icon: 'fab fa-octopus-deploy' },
	];

	const modes = [
		{ label: 'all', icon: 'eye' },
		{ label: 'discover', icon: 'compass' },
	];

	//handle style changes to active button
	const [critterType, setActiveCritter] = useState(types[0].label);
	const [modeType, setActiveMode] = useState(modes[0].label);

	const activeBtn = {
		color: `rgb(254, 203, 77)`,
	};

	return (
		<>
			<div className='filters-bar'>
				{/*Horizontal line behind buttons */}
				<span id='line'> </span>

				{/* Species Filters */}
				<div className='species'>
					{types.map(({ label, icon }, i) => (
						<div key={label} className='btn-wrapper'>
							{critterType === label ? (
								<div className='tooltip'>{label}</div>
							) : null}

							<button
								style={critterType === label ? activeBtn : null}
								key={label}
								value={label}
								onClick={() => {
									getCreatures(modeType, label);
									setActiveCritter(types[i].label);
								}}>
								<i className={label !== 'sea' ? `fas fa-${icon}` : icon}></i>
							</button>
						</div>
					))}
				</div>

				{/* Availability Filters */}
				<div className='availability'>
					{modes.map(({ label, icon }, i) => (
						<div key={label} className='btn-wrapper'>
							{modeType === label ? (
								<div className='tooltip'>{label}</div>
							) : null}

							<button
								style={modeType === label ? activeBtn : null}
								key={label}
								value={label}
								onClick={() => {
									setActiveMode(modes[i].label);
									getCreatures(label, critterType);
								}}>
								<i className={`fas fa-${icon}`}></i>
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default FilterBar;
