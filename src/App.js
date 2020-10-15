import React, { useState } from "react";
import "./App.css";

//import child components
import Heading from "./Layout/MainHeading";
import FilterBar from "./Layout/FilterBar";

const App = () => {
  const [state, setFilters] = useState({
    language: "English",
    results: [],
    type: "",
  });

  const { type, language, results } = state;

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

  //begin render
  return (
    <div>
      <Heading />
      <FilterBar getCreatures={getCreatures} setLang={setLang} />
      <main>
        <div>
          {results.map(({ id, name, icon_uri }) => (
            <div key={id}>
              <img
                className="search-img"
                src={`https://acnhapi.com/v1a/images/${type}/${id}`}
                alt="placeholder"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
