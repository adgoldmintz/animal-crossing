import React from "react";

const DetailView = ({ selected: { id, name, image_uri}, lang }) => {
  return (
    <div className="details-wrapper">
      <div className="details-content">

        <p>details here : {id}</p>

        <div>NAME: {name[`name-${lang}`]}</div>
        <button>NEXT</button>
       
        <img src={image_uri} alt={name[`name-${lang}`]}/>
      </div>
    </div>
  );
};

export default DetailView;
