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
      <button value="sea" onClick={getCreatures}>
        Sea
      </button>
    </div>

    <div className="language-filters">
      <button value="USen" onClick={setLang}>
        English
      </button>
      <button value="JPja" onClick={setLang}>
        日本語
      </button>
    </div>
  </div>
);

export default FilterBar;
