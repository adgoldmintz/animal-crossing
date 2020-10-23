import React from "react";
import "./Loading.css";
import bugsIcon from "../assets/bugs.png";

const Loading = ({ grids: { bugs } }) => {
  console.log(bugs);
  const gridRows = [];

  for (let i = 0; i <= bugs; i++) {
    gridRows.push(
      <div key={i}>
        <img src={bugsIcon} />
      </div>
    );
  }

  return <div className="loading-wrapper">{gridRows}</div>;
};

export default Loading;
