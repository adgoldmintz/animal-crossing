import React from "react";
import noResults from "../assets/twins.png";

const ResultsGrid = ({ searchResults, setDetailItem }) => {
  if (searchResults.length < 1) {
    return (
      <div>
        <p>No critters found!</p>
        <img id="no-results-img" src={noResults} alt="No Results" />
      </div>
    );
  } else {
    return (
      <div className="results-wrapper">
        {searchResults.map((creature) => {
          const { id, name, icon_uri } = creature;
          return (
            <div key={id} className="results-item">
              <img
                className="search-img"
                src={icon_uri}
                alt={name["name-USen"]}
                onClick={() => {
                  setDetailItem(creature);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default ResultsGrid;
