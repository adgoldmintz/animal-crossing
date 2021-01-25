import React, { useEffect, useState } from 'react';
import './styles/utilities.css';
import logo from './assets/ac_logo.png';

//import child components
import FilterBar from './components/FilterBar';
import ResultsGrid from './components/Results';
import DetailsView from './components/DetailView';
import SearchBar from './components/SearchBar';

const App = () => {
	//set up state management
	const [state, setFilters] = useState({
		language: 'USen',
		hemisphere: 'northern',
		searchTerm: '',
		results: [],
		type: undefined,
		currentItem: {},
		loading: true,
		showDetailModal: false,
		currentMonth: new Date().getMonth() + 1,
		mode: 'all',
	});

	//destructure filter state for easy reference
	const {
		language,
		hemisphere,
		searchTerm,
		results,
		type,
		currentItem,
		loading,
		showDetailModal,
		currentMonth,
		mode,
	} = state;

	//fetch ALL 'bugs' data set as default view on initial mount
	useEffect(() => {
		fetch(`https://acnhapi.com/v1a/bugs`)
			.then((response) => response.json())
			.then((results) =>
				setFilters({
					...state,
					type: 'bugs',
					results,
					loading: false,
				}),
			);
		// eslint-disable-next-line
	}, []);

	// Check for showDetailModal state to toggle body scrolling
	useEffect(() => {
		if (showDetailModal) {
			document.body.classList.add('scroll-lock');
		} else if (!showDetailModal) {
			document.body.classList.remove('scroll-lock');
		}
	}, [showDetailModal]);

	//  ----- BEGIN HANDLERS -----  //

	//set creature type and fetch data set
	const getCreatures = (mode, type) => {
		setFilters({
			...state,
			loading: true,
		});

		fetch(`https://acnhapi.com/v1a/${type}`)
			.then((response) => response.json())
			.then((results) =>
				setFilters({
					...state,
					searchTerm: '',
					type,
					mode,
					// Filter results by availablity current month and selected hemisphere
					results:
						mode !== 'all'
							? results.filter((creature) =>
									creature.availability[`month-array-${hemisphere}`].includes(
										currentMonth,
									),
							  )
							: results,
					loading: false,
				}),
			);
	};

	// live search handler
	const handleSearchChange = (e) => {
		let searchTerm = e.target.value;
		setFilters({
			...state,
			searchTerm,
		});
	};

	//declare filtered results outside of state
	//this subset is mapped in ResultsGrid child render below
	let searchResults = results.filter((creature) =>
		creature.name[`name-${language}`].includes(searchTerm.toLocaleLowerCase()),
	);

	const setDetailItem = ({
		id,
		name,
		icon_uri,
		image_uri,
		availability,
		price,
		...others
	}) =>
		setFilters({
			...state,
			showDetailModal: !showDetailModal,
			currentItem: {
				id,
				name,
				image_uri,
				location: availability.location,
				rarity: availability.rarity,
				// others not destructured because JSON phrase key has a dash - boooo!
				phrase: others['catch-phrase'],
				price,
				flickPrice: others['price-flick'],
			},
		});

	//toggle language (English or Japanese)
	const setLang = (e) =>
		setFilters({
			...state,
			language: e.target.value,
		});

	//toggle language (English or Japanese)
	const setHemisphere = (e) =>
		setFilters({
			...state,
			hemisphere: e.target.value,
		});

	// move forward and backward through selected critter in detail view
	const setCreatureDetail = (index) => {
		setFilters({
			...state,
			currentItem: {
				id: results[index].id,
				name: results[index].name,
				image_uri: results[index].image_uri,
				location: results[index].availability.location,
				rarity: results[index].availability.rarity,
				phrase: results[index]['catch-phrase'],
				price: results[index].price,
				flickPrice: results[index]['price-flick'],
				shadow: results[index].shadow,
				speed: results[index].speed,
			},
		});
	};

	//toggle detail modal visible and hidden
	const toggleDetailModal = () => {
		setFilters({
			...state,
			showDetailModal: !showDetailModal,
		});
	};

	//move forward and back through creature index via modal
	const getNext = () => {
		let nextIndex = currentItem.id + 1;
		setCreatureDetail(nextIndex);
	};

	const getPrev = () => {
		let prevIndex = currentItem.id - 2;
		setCreatureDetail(prevIndex);
	};

	//  ----- BEGIN RENDER -----  //
	return (
		<div id='master-container'>
			<img src={logo} id='acnh-logo' alt='Animal Crossing New Horizons Logo' />
			<header>
				<div className='title-wrapper'>
					<h1 id='app-title'>Critterpedia Lite</h1>
				</div>

				<div className='app-intro'>
					<div className='intro-copy'>
						<span className='title-wrapper'>
							<h2>Welcome</h2>
						</span>
						<p>
							Welcome to <strong>Critterpedia Lite</strong>! This is a simple
							React app built to help ACNH players discover which critters are
							currently available in their hemisphere.
							<br></br>
							<br></br>
							Use the filters in this intro and on the grid below to customize
							your critter view.
							<br></br>
							<br></br>
							<em>
								A big thank you to the{' '}
								<a href='http://acnhapi.com/'>ACNH API team</a> and to{' '}
								<a href='https://critterpedia-plus.mutoo.im/#/discovery/insects'>
									Ninja from HiddenLeaf
								</a>{' '}
								for the inspiration!
							</em>
						</p>
					</div>

					<SearchBar
						handleChange={handleSearchChange}
						lang={language}
						setLang={setLang}
						hemisphere={hemisphere}
						setHemisphere={setHemisphere}
						mode={mode}
					/>
				</div>
			</header>

			<main>
				<FilterBar getCreatures={getCreatures} />

				<ResultsGrid
					searchResults={searchResults}
					setDetailItem={setDetailItem}
					term={searchTerm}
					lang={language}
					loading={loading}
				/>
			</main>

			{showDetailModal && (
				<DetailsView
					selected={currentItem}
					type={type}
					lang={language}
					getNext={getNext}
					getPrev={getPrev}
					resultsLength={results.length}
					toggleDetailModal={toggleDetailModal}
				/>
			)}
		</div>
	);
};

export default App;
