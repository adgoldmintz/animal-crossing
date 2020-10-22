import React, { useState } from "react";

const FilterBar = ({
  getCreatures,
  setLang,
  searchChange,
  searchTerm,
  lang,
}) => {
  const types = ["bugs", "fish", "sea"];
  const languages = [
    { code: "USen", text: "E" },
    { code: "JPja", text: "JP" },
  ];

  //handle style changes to active button
  //TODO: Update colors. Red is a placeholder
  const [critterType, setActiveCritter] = useState(types[0]);
  const [langType, setActiveLang] = useState(lang);

  const activeBtn = {
    backgroundColor: "#FF0000",
  };

  return (
    <div className="filter-wrapper">
      <div className="species-filters">
        {types.map((type, i) => (
          <button
            className="species-btn"
            style={critterType === type ? activeBtn : null}
            key={type}
            value={type}
            onClick={(e) => {
              getCreatures(e);
              setActiveCritter(types[i]);
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
        {languages.map(({ code, text }, i) => (
          <button
            key={text}
            className="species-btn"
            value={code}
            onClick={(e) => {
              setLang(e);
              setActiveLang(code);
            }}
            style={langType === code ? activeBtn : null}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
