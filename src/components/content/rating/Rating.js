import React, { useState, useEffect, Fragment, useRef } from "react";
import "./Rating.scss";
import PropTypes from "prop-types";

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i++));
    let percentage;
    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const startPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = startPercentage;
  }, [rating, totalStars]);
  return (
    <div className="rating">
      <div className={`rating-star ${className}`}>
        {numberOfStars &&
          numberOfStars.map((i) => (
            <Fragment key={i}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}
        <div className={`rating-star2 ${className}`} ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((i) => (
              <Fragment key={i}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Rating;
