import React from 'react';
import '../styles/detailView.css';
const DetailView = ({
	selected: {
		id,
		name,
		image_uri,
		location,
		rarity,
		price,
		phrase,
		flickPrice,
	},
	type,
	lang,
	resultsLength,
	getNext,
	getPrev,
	toggleDetailModal,
}) => {
	//Capitalize first letters of each word
	const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	return (
		//TODO: Don't display modal until all props are loaded
		<div className='critter-wrapper'>
			<section className='critter-img'>
				<div className='critter-name'>
					<span>
						{name[`name-${lang}`].split(' ').map(capitalizeFirst).join(' ')}
					</span>
				</div>

				<img id='critter-pic' src={image_uri} alt={name[`name-${lang}`]} />

				<div className='img-controls'>
					{id !== 1 && (
						<i
							className='fas fa-arrow-circle-left'
							id='left-arrow'
							onClick={getPrev}
						/>
					)}
					<i
						className='fas fa-times-circle'
						id='close'
						onClick={toggleDetailModal}
					/>
					{id !== resultsLength && (
						<i
							className='fas fa-arrow-circle-right'
							id='right-arrow'
							onClick={getNext}
						/>
					)}
				</div>
			</section>

			<section className='critter-details'>
				{location && <p>Location: {location}</p>}
				{rarity && <p>Rarity: {rarity}</p>}
				<p>
					Price: {price}{' '}
					{type === 'bugs' && `(or ${flickPrice} when sold to Flick)`}
				</p>

				<div>{phrase}</div>
			</section>
		</div>
	);
};

export default DetailView;
