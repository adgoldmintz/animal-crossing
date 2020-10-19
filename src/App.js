import React, { useEffect, useState } from "react";
import "./App.css";

//import child components
import Heading from "./Layout/MainHeading";
import FilterBar from "./Layout/FilterBar";
import DetailsView from "./Details/DetailView";

const App = () => {
  //set up state management
  const [state, setFilters] = useState({
    language: "USen",
    searchTerm: "",
    results: [],
    type: undefined,
    viewDetailsModal: false,
    currentItem: {},
    loading: false,
  });

  //destructure state for easy reference
  const {
    results,
    viewDetailsModal,
    currentItem,
    language,
    type,
    searchTerm,
  } = state;

  //fetch 'bugs' data set on as default view on initial render
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
  //this subset is mapped in render below
  let filteredResults = results.filter((creature) =>
    creature.name[`name-${language}`].includes(searchTerm)
  );

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

  const setLang = (e) => {
    setFilters({
      ...state,
      language: e.target.value,
    });
  };

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

  const toggleDetailModal = () => {
    setFilters({
      ...state,
      viewDetailsModal: !viewDetailsModal,
      currentItem: {},
    });
  };

  //begin render
  return (
    <div>
      <Heading />
      <FilterBar
        searchChange={handleSearchChange}
        getCreatures={getCreatures}
        setLang={setLang}
        searchTerm={searchTerm}
      />

      {viewDetailsModal && (
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
        {/* TODO: Add no results found state */}
        {results && (
          <div className="results-wrapper">
            {filteredResults.map(({ id, name, icon_uri, image_uri }) => (
              <div key={id} className="results-item">
                <img
                  className="search-img"
                  src={icon_uri}
                  alt={name["name-USen"]}
                  onClick={() =>
                    setFilters({
                      ...state,
                      viewDetailsModal: !viewDetailsModal,
                      currentItem: {
                        id: id,
                        name: name,
                        image_uri: image_uri,
                      },
                    })
                  }
                />
                {/*} <p>{name["name-USen"]}</p>*/}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

//TODO:
//add No critters found state
// add loading state to wait until all data is loaded before mapping
