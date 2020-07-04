import React from "react";
import "./Grid.scss";
import Rating from "../rating/Rating";
import PropTypes from "prop-types";

const Grid = (props) => {
  const { images } = props;
  return (
    <div className="grid">
      {images.map((image, i) => (
        <div key={i}>
          <div className="grid-cell" style={{ backgroundImage: `url(${image.url})` }}>
            <div className="grid-detail">
              <button className="grid-detail-btn">詳しく見る</button>
            </div>
            <div className="grid-movie">
              <span className="grid-movie-title">Movie Title</span>
              <div className="grid-movie-rating">
                <Rating rating={image.rating} totalStars={10} />
                &nbsp;&nbsp;
                <div className="grid-movie-rating-score">{image.rating}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Grid;
