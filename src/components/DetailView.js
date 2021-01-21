import React from 'react';
import '../styles/detail-view.css';

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
		shadow,
		speed,
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

	//Increase image size if type is fish. API returns smaller pics :(

	return (
		//TODO: Don't display modal until all props are loaded
		<div id='backdrop'>
			<div
				className={
					type === 'fish' ? `critter-wrapper-fish` : `critter-wrapper`
				}>
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
								id='back'
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
								id='forward'
								onClick={getNext}
							/>
						)}
					</div>
				</section>

				<section className='critter-details-col'>
					<div id='phrase'>{phrase}</div>

					<div className='detail-wrapper'>
						{location && (
							<div>
								<div className='title-wrapper'>
									<h2>Location</h2>
								</div>
								{location}
							</div>
						)}

						{rarity && (
							<div>
								<div className='title-wrapper'>
									<h2>Rarity</h2>
								</div>
								{rarity}
							</div>
						)}
					</div>

					<div className='detail-wrapper'>
						{speed && (
							<div>
								<div className='title-wrapper'>
									<h2>Speed</h2>
								</div>
								{speed}
							</div>
						)}

						{shadow && (
							<div>
								<div className='title-wrapper'>
									<h2>Shadow</h2>
								</div>
								{shadow}
							</div>
						)}
					</div>

					<div>
						<div className='title-wrapper'>
							<h2>Price</h2>
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
