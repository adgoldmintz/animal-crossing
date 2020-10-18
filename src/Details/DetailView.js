import React from "react";

const DetailView = ({
  selected: { id, name, image_uri },
  lang,
  resultsLength,
  getNext,
  getPrev,
  toggleDetailModal,
}) => {
  return (

    //TODO: Don't display modal until all props are loaded
    <div className="details-wrapper">
      <div className="details-controls">
        {id !== 1 && <i class="fas fa-arrow-circle-left" onClick={getPrev} />}
        {id !== resultsLength && (
          <i class="fas fa-arrow-circle-right" onClick={getNext} />
        )}
        <i class="fas fa-times-circle" onClick={toggleDetailModal} />
      </div>
      <div className="details-content">
        <div>NAME: {name[`name-${lang}`]}</div>

        <img src={image_uri} alt={name[`name-${lang}`]} />
      </div>
    </div>
  );
};

export default DetailView;
