import React, { useState } from "react";
import "./Review.scss";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Review = (props) => {
  const { movie } = props;
  const [reviews] = useState(movie[4]);

  return (
    <div className="review">
      <div className="review-title">{reviews.results.length > 0 ? reviews.results.length : ""} レビュー</div>
      {reviews.results.length ? (
        reviews.results.map((data) => (
          <div className="review-content" key={uuidv4}>
            <h3>{data.author}</h3>
            <div>{data.content}</div>
          </div>
        ))
      ) : (
        <p>レビューはありません</p>
      )}
    </div>
  );
};

Review.propTypes = {
  movie: PropTypes.array,
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
});

export default connect(mapStateToProps, {})(Review);
