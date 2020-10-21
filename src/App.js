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
    type,
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

  const setDetailItem = ({ id, name, icon_uri, image_uri, ...others }) =>
    setFilters({
      ...state,
      showDetailModal: !showDetailModal,
      currentItem: {
        id,
        name,
        image_uri,
        // others not destructured because JSON phrase key has a dash - boooo!
        phrase: others["catch-phrase"],
      },
    });

  //show results or no search results found

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
          results,
        })
      );
  };

  //toggle language (English or Japanese)
  const setLang = (e) =>
    setFilters({
      ...state,
      language: e.target.value,
    });

  // move forward and backward through selected critter in detail view
  const getNext = () => {
    let nextID = currentItem.id + 1;

    fetch(`https://acnhapi.com/v1a/${type}/${nextID}`)
      .then((response) => response.json())
      .then((results) =>
        setFilters({
          ...state,
          currentItem: {
            id: results.id,
            name: results.name,
            image_uri: results.image_uri,
          },
        })
      );
  };

  const getPrev = () => {
    let nextID = currentItem.id - 1;

    fetch(`https://acnhapi.com/v1a/${type}/${nextID}`)
      .then((response) => response.json())
      .then((results) =>
        setFilters({
          ...state,
          currentItem: {
            id: results.id,
            name: results.name,
            image_uri: results.image_uri,
          },
        })
      );
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
