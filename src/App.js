import React, { useEffect, useState } from 'react';
import './styles/utilities.css';
import logo from './assets/ac_logo.png';

//import child components
import FilterBar from './components/FilterBar';
import ResultsGrid from './components/Results';
import DetailsView from './components/DetailView';

const App = () => {
	//set up state management
	const [state, setFilters] = useState({
		language: 'USen',
		searchTerm: '',
		results: [],
		type: undefined,
		currentItem: {},
		loading: true,
		showDetailModal: false,
	});

	//destructure filter state for easy reference
	const {
		results,
		currentItem,
		language,
		searchTerm,
		showDetailModal,
		type,
		loading,
	} = state;

	//fetch 'bugs' data set as default view on initial mount
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
		//eslint-disable-next-line
	}, []);

	//set creature type and fetch data set
	const getCreatures = (e) => {
		let type = e.currentTarget.value;
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
					results,
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
			},
		});
	};

	const getNext = () => {
		let nextIndex = currentItem.id + 1;
		setCreatureDetail(nextIndex);
	};

	const getPrev = () => {
		let prevIndex = currentItem.id - 2;
		setCreatureDetail(prevIndex);
	};

	//toggle detail card visible and hidden
	const toggleDetailModal = () => {
		setFilters({
			...state,
			showDetailModal: !showDetailModal,
		});
	};

	//begin view render
	return (
		<>
			<header>
				<div>Header content here </div>
			</header>
			<main>
				<div>Introduction content </div>
				<FilterBar
					searchChange={handleSearchChange}
					getCreatures={getCreatures}
					setLang={setLang}
					searchTerm={searchTerm}
					lang={language}
				/>

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

				<ResultsGrid
					searchResults={searchResults}
					setDetailItem={setDetailItem}
					term={searchTerm}
					lang={language}
					loading={loading}
				/>
			</main>
		</>
	);
};

export default App;
