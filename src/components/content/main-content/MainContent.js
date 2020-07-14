import React, { useState, useEffect } from "react";
import "./MainContent.scss";
import SlideShow from "../slide-show/SlideShow";
import Pagination from "../pagination/Pagination";
import Grid from "../grid/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovie, setResponsePageNumber } from "../../../redux/action/movie";
import { IMAGE_URL } from "../../../API/movieAPI";

const MainContent = (props) => {
  const { list, movieType, totalPageIndex, page, getMovie, setResponsePageNumber } = props;

  const [currentPageIndex, setCurrentPageIndex] = useState(page);
  const [images, setImages] = useState([]);
  const randomMovie = list.sort(() => Math.random() - Math.random()).slice(0, 4);

  const HEADER_TYPE = {
    now_playing: "上映中の作品",
    popular: "人気作",
    top_rated: "急上昇",
    upcoming: "今後の作品",
  };

  useEffect(() => {
    if (randomMovie.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovie[0].backdrop_path}`,
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovie[1].backdrop_path}`,
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovie[2].backdrop_path}`,
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovie[3].backdrop_path}`,
        },
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPageIndex(page);
  }, [page, totalPageIndex]);

  const paginate = (type) => {
    let pageNumber = currentPageIndex;
    if (type === "prev" && currentPageIndex > 1) {
      pageNumber -= 1;
    } else if(type === "next") {
      pageNumber += 1;
    }
    setCurrentPageIndex(pageNumber);
    setResponsePageNumber(pageNumber, totalPageIndex);
    getMovie(movieType, pageNumber);
  };
  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} arrows={true} />
      <div className="movie-title">
        <div className="movie-type">{HEADER_TYPE[movieType]}</div>
        <div className="movie-page">
          <Pagination paginate={paginate} currentPageIndex={currentPageIndex} totalPageIndex={totalPageIndex} />
        </div>
      </div>
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  movieType: PropTypes.string.isRequired,
  totalPageIndex: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  getMovie: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPageIndex: state.movies.totalPageIndex,
  page: state.movies.page,
});

export default connect(mapStateToProps, { getMovie, setResponsePageNumber })(MainContent);
