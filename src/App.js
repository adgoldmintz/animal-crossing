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
    results: null,
    type: null,
    viewDetailsModal: false,
    currentItem: {},
  });

  //destructure state for easy reference
  const { results, viewDetailsModal, currentItem, language, type } = state;

  //load bugs on as default view on initial render
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

  const getCreatures = (e) => {
    let type = e.target.value;

    fetch(`https://acnhapi.com/v1a/${type}`)
      .then((response) => response.json())
      .then((results) =>
        setFilters({
          ...state,
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
      <FilterBar getCreatures={getCreatures} setLang={setLang} />

      {viewDetailsModal && (
        <DetailsView
          selected={currentItem}
          lang={language}
          getNext={getNext}
          getPrev={getPrev}
          resultsLength={results + 1}
          toggleDetailModal={toggleDetailModal}
        />
      )}

      <main>
        {results && (
          <div className="results-wrapper">
            {results.map(({ id, name, icon_uri, image_uri }) => (
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
// add loading state to wait until all data is loaded before mapping
