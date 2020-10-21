import React, { Fragment, useState } from "react";

const FilterBar = ({ getCreatures, setLang, searchChange, searchTerm }) => {
  const types = ["bugs", "fish", "sea"];

  //handle style changes to active button
  //TODO: Update colors. Red is a placeholder
  //TODO : Add same logic to language toggles
  const [active, setActive] = useState(types[0]);
  const activeBtn = {
    backgroundColor: "#FF0000",
  };

  return (
    <Fragment>
      <div className="filter-wrapper">
        <div className="species-filters">
          {types.map((type, i) => (
            <button
              className="species-btn"
              style={active === type ? activeBtn : null}
              key={type}
              value={type}
              onClick={(e) => {
                getCreatures(e);
                setActive(types[i]);
              }}
            >
              <img
                className="filter-icon"
                src={require(`../assets/${type}.png`)}
                alt={`${type} icon`}
              />
            </button>
          ))}
        </div>

        <form className="search-form">
          <input
            type="text"
            placeholder="search critters"
            value={searchTerm}
            onChange={searchChange}
          />
        </form>

        <div className="language-filters">
          <button value="USen" onClick={setLang}  className="species-btn">
            E
          </button>
          <button value="JPja" onClick={setLang}  className="species-btn">
            JP
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterBar;
