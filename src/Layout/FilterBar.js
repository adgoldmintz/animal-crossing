import React from "react";

const FilterBar = ({ getCreatures, setLang }) => (
  <div className="filter-wrapper">
    <div className="species-filters">
      <button value="bugs" onClick={getCreatures}>
        Bugs
      </button>
      <button value="fish" onClick={getCreatures}>
        Fish
      </button>

      <div className="language-filters">
        <button value="English" onClick={setLang}>
          English
        </button>
        <button value="Japanese" onClick={setLang}>
          日本語
        </button>
      </div>
    </div>
  </div>
);

export default FilterBar;
