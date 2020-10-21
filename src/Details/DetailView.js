import React from "react";

const DetailView = ({
  selected: { id, name, image_uri, phrase },
  lang,
  resultsLength,
  getNext,
  getPrev,
  toggleDetailModal,
}) => {
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    //TODO: Don't display modal until all props are loaded
    <div className="details-wrapper">
      <section className="details-controls">
        {id !== 1 && (
          <i className="fas fa-arrow-circle-left" onClick={getPrev} />
        )}
        {id !== resultsLength && (
          <i className="fas fa-arrow-circle-right" onClick={getNext} />
        )}
        <i className="fas fa-times-circle" onClick={toggleDetailModal} />
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
      </div>
    </div>
  );
};

export default DetailView;
