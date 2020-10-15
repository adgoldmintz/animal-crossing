import React, { Fragment } from "react";

const FilterBar = ({ getCreatures, setLang }) => (
  <Fragment>
    <div className="filter-wrapper">
      <button value="bugs" onClick={getCreatures}>
        Bugs
      </button>
      <button value="fish" onClick={getCreatures}>
        Fish
      </button>

      <div className="filter-wrapper">
        <button value="English" onClick={setLang}>
          English
        </button>
        <button value="Japanese" onClick={setLang}>
          日本語
        </button>
      </div>
    </div>
  </Fragment>
);

export default FilterBar;
