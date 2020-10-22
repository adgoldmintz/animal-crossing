import React, { useState } from "react";
import './Results.css'
import noResults from "../assets/twins.png";

const ResultsGrid = ({ searchResults, setDetailItem, term }) => {
  //state management for name label viewed on hover
  const [hover, labelState] = useState({
    id: null,
    show: false,
  });

  const handleMouseOver = (id) =>
    labelState({
      id,
      show: true,
    });

  const handleMouseOut = () =>
    labelState({
      id: null,
      show: false,
    });

  const nameLabelStyle = {
    display: hover.show ? "flex" : "none",
  };

  if (searchResults.length < 1 && term) {
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
              {/*Label with name appears on hover */}
              {hover.id === id && (
                <div style={nameLabelStyle}>{name["name-USen"]}</div>
              )}
              <img
                onMouseOver={() => handleMouseOver(id)}
                onMouseOut={handleMouseOut}
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
