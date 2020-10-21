import React, { useEffect, useState } from "react";
import "./App.css";

//import child components
import Heading from "./layout/MainHeading";
import FilterBar from "./filter-search/FilterBar";
import DetailsView from "./details/DetailView";
import ResultsGrid from "./filter-search/Results";

const App = () => {
  //set up state management
  const [state, setFilters] = useState({
    language: "USen",
    searchTerm: "",
    results: [],
    types: undefined,
    currentItem: {},
    loading: false,
    showDetailModal: false,
  });

  //destructure filter state for easy reference
  const {
    results,
    currentItem,
    language,
    searchTerm,
    showDetailModal,
  } = state;

  //fetch 'bugs' data set as default view on initial mount
  useEffect(() => {
    fetch(`https://acnhapi.com/v1a/bugs`)
      .then((response) => response.json())
      .then((results) =>
        setFilters({
          ...state,
          type: "bugs",
          results,
        })
      );
    //eslint-disable-next-line
  }, []);


    //set creature type and fetch data set
    const getCreatures = (e) => {
      let type = e.currentTarget.value;
      fetch(`https://acnhapi.com/v1a/${type}`)
        .then((response) => response.json())
        .then((results) =>
          setFilters({
            ...state,
            searchTerm: "",
            type,
            results
          })
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
    creature.name[`name-${language}`].includes(searchTerm.toLocaleLowerCase())
  );

  const setDetailItem = ({ id, name, icon_uri, image_uri, availability, price, ...others }) =>
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
        phrase: others["catch-phrase"],
        price,
        flickPrice: others["price-flick"]
      },
    });

    console.log(currentItem)

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
        location: results[index].location,
        phrase: results[index]["catch-phrase"],
        price: results[index].price,
        flickPrice: results[index]["price-flick"]
      },
    });
  }
  
  const getNext = () => {
    let nextIndex = currentItem.id + 1;
    setCreatureDetail(nextIndex)
  };

  const getPrev = () => {
    let prevIndex = currentItem.id - 2;
    setCreatureDetail(prevIndex)
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
    <div>
      <Heading />

      <FilterBar
        searchChange={handleSearchChange}
        getCreatures={getCreatures}
        setLang={setLang}
        searchTerm={searchTerm}
      />

      {showDetailModal && (
        <DetailsView
          selected={currentItem}
          lang={language}
          getNext={getNext}
          getPrev={getPrev}
          resultsLength={results.length}
          toggleDetailModal={toggleDetailModal}
        />
      )}

      <main>
        <ResultsGrid
          searchResults={searchResults}
          setDetailItem={setDetailItem}
        />
      </main>
    </div>
  );
};

export default App;

//TODO:
//add No critters found state
// add loading state to wait until all data is loaded before mapping
