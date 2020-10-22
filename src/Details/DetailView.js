import React from "react";
import "./DetailView.css";

const DetailView = ({
  selected: {
    id,
    name,
    image_uri,
    location,
    rarity,
    price,
    phrase,
    flickPrice,
  },
  type,
  lang,
  resultsLength,
  getNext,
  getPrev,
  toggleDetailModal,
}) => {
  //Capitalize first letters of each word
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    //TODO: Don't display modal until all props are loaded
    <div className="details-wrapper">
      <section className="details-controls">
        {id !== 1 && (
          <i className="fas fa-arrow-circle-left" onClick={getPrev} />
        )}
        <i className="fas fa-times-circle" onClick={toggleDetailModal} />
        {id !== resultsLength && (
          <i className="fas fa-arrow-circle-right" onClick={getNext} />
        )}
      </section>

      <section className="details-heading">
        <div>
          {name[`name-${lang}`].split(" ").map(capitalizeFirst).join(" ")}
        </div>
        <div>{phrase}</div>
      </section>
      <div className="details-content">
        <img
          className="detail-img"
          src={image_uri}
          alt={name[`name-${lang}`]}
        />
        {location && <p>Location: {location}</p>}
        {rarity && <p>Rarity: {rarity}</p>}
        <p>
          Price: {price} {type === "bugs" && (`(or ${flickPrice} when sold to Flick)`)}
        </p>
      </div>
    </div>
  );
};

export default DetailView;
