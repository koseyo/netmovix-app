import React, { useState, useEffect, Fragment } from "react";
import "../grid/Grid.scss";
import "./Search.scss";
import Rating from "../rating/Rating";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../../API/movieAPI";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import LazyImage from "../../lazy-image/LazyImage";

const Search = (props) => {
  const { searchQuery, searchResult } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <div className="grid-search-word">
      <div className="grid-search-title">
        <span className="grid-search-text1">キーワード: {searchQuery}</span> <span className="grid-search-text2">で検索しています</span>
      </div>
      <div className="grid">
        {movieData.map((data) => (
          <Fragment key={uuidv4()}>
            {data.poster_path && (
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
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  searchQuery: state.movies.searchQuery,
  searchResult: state.movies.searchResult,
});

export default connect(mapStateToProps, {})(Search);
