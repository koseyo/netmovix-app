import React, { useState, useEffect } from "react";
import "./Grid.scss";
import Rating from "../rating/Rating";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../../API/movieAPI";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import LazyImage from "../../lazy-image/LazyImage";

const Grid = (props) => {
  const { list } = props;
  console.log(list);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <div className="grid">
      {movieData.map((data) => (
        <div key={uuidv4()}>
          <LazyImage className="grid-cell" src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
            <div className="grid-detail">
              <button className="grid-detail-btn">詳しく見る</button>
            </div>
            <div className="grid-movie">
              <span className="grid-movie-title">{data.title}</span>
              <div className="grid-movie-rating">
                <Rating rating={data.vote_average} totalStars={10} />
                &nbsp;&nbsp;
                <div className="grid-movie-rating-score">{data.vote_average}</div>
              </div>
            </div>
          </LazyImage>
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  list: PropTypes.array,
  images: PropTypes.array,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
});

export default connect(mapStateToProps, {})(Grid);
