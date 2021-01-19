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
		<div className='test'>
			<div className='critter-wrapper'>
				<section className='critter-img-col'>
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

				<section className='critter-details-col'>
					<div id='phrase' style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
						{phrase}
					</div>
					{location && (
						<div>
							<div className='title-wrapper'>
								<div className='title'>Location</div>
							</div>
							{location}
						</div>
					)}
					{rarity && (
						<div>
							<div className='title-wrapper'>
								<div className='title'>Rarity</div>
							</div>
							{rarity}
						</div>
					)}
					<div>
						<div className='title-wrapper'>
							<div className='title'>Price</div>
						</div>
						{price}
						{type === 'bugs' && (
							<span
								style={{
									fontStyle: 'italic',
								}}>{` (or ${flickPrice} when sold to Flick)`}</span>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default DetailView;
