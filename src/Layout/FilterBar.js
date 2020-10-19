import React from "react";
import bugsIcon from "../assets/bugs.png";
import fishIcon from "../assets/fish.png";
import seaIcon from "../assets/sea.png";

const FilterBar = ({ getCreatures, setLang, searchChange, searchTerm }) => (
  <div className="filter-wrapper">
    <div className="species-filters">
      <button value="bugs" onClick={getCreatures}>
        <img className="filter-icon" src={bugsIcon} alt="bug icon" />
      </button>
      <button value="fish" onClick={getCreatures}>
        <img className="filter-icon" src={fishIcon} alt="fish icon" />
      </button>
      <button value="sea" onClick={getCreatures}>
        <img className="filter-icon" src={seaIcon} alt="sea creature icon" />
      </button>
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
