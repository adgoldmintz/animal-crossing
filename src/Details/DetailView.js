import React from "react";

const DetailView = ({
  selected: { id, name, image_uri },
  lang,
  resultsLength,
  getNext,
  getPrev,
  toggleDetailModal
}) => {
  return (
    <div className="details-wrapper">
      <div className="details-content">
      {id !== 1 && <button onClick={getPrev}>PREV</button>}
      {id !== resultsLength && <button onClick={getNext}>NEXT</button>}
      <button onClick={toggleDetailModal}>X</button>
      <br></br>
        <div>NAME: {name[`name-${lang}`]}</div>
       
        <img src={image_uri} alt={name[`name-${lang}`]} />
      </div>
    </div>
  );
};

export default DetailView;
