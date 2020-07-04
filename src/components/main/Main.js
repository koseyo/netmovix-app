import React, { useState, useEffect, useRef } from "react";
import "./Main.scss";
import MainContent from "../content/main-content/MainContent";
import Spinner from "../spinner/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadMoreMovies, setResponsePageNumber } from "../../redux/action/movie";
import Search from "../content/search/Search";

const Main = (props) => {
  const { loadMoreMovies, page, totalPageIndex, setResponsePageNumber, movieType, searchResult } = props;
  const [loading, setLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setResponsePageNumber(currentPageIndex, totalPageIndex);
    // eslint-disable-next-line
  }, [currentPageIndex, totalPageIndex]);

  const fetchData = () => {
    let pageNumber = currentPageIndex;
    if (page < totalPageIndex) {
      pageNumber += 1;
      setCurrentPageIndex(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect().height;
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  return (
    <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
      {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <Search />}</>}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPageIndex: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  movieType: PropTypes.string,
  searchResult: PropTypes.array,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPageIndex: state.movies.totalPageIndex,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult,
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(Main);