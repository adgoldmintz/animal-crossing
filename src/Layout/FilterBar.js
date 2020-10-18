import React from "react";
import bugsIcon from '../assets/bugs.png';
import fishIcon from '../assets/fish.png';
import seaIcon from '../assets/sea.png'


const FilterBar = ({ getCreatures, setLang }) => (
  <div className="filter-wrapper">
    <div className="species-filters">
      <button value="bugs" onClick={getCreatures}>
        <img className="filter-icon" src={bugsIcon}/>
      </button>
      <button value="fish" onClick={getCreatures}>
      <img className="filter-icon" src={fishIcon}/>
      </button>
      <button value="sea" onClick={getCreatures}>
      <img className="filter-icon" src={seaIcon}/>
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
