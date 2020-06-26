import React, { useState, useEffect } from "react";
import "./MainContent.scss";
import SlideShow from "../slide-show/SlideShow";
import Pagination from "../pagination/Pagination";
import Grid from "../grid/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../../API/movieAPI";

const MainContent = (props) => {
  const { list } = props;
  const imagesArray = [
    {
      url: "https://images.pexels.com/photos/688574/pexels-photo-688574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
    {
      url: "https://images.pexels.com/photos/688574/pexels-photo-688574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
    {
      url: "https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
    {
      url: "https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
    {
      url: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
    {
      url: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      rating: 7.5,
    },
  ]; // imageAPI
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [images, setImages] = useState([]);
  const randomMovie = list.sort(() => Math.random() - Math.random()).slice(0, 4);

  useEffect(() => {
    if (randomMovie.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}/${randomMovie[0].backdrop_path}`,
        },
        {
          id: 2,
          url: `${IMAGE_URL}/${randomMovie[1].backdrop_path}`,
        },
        {
          id: 3,
          url: `${IMAGE_URL}/${randomMovie[2].backdrop_path}`,
        },
        {
          id: 4,
          url: `${IMAGE_URL}/${randomMovie[3].backdrop_path}`,
        },
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  const paginate = (type) => {
    if (type === "prev" && currentPageIndex > 1) {
      setCurrentPageIndex((prev) => prev - 1);
    } else {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };
  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} arrows={true} />
      <div className="movie-title">
        <div className="movie-type"></div>
        <div className="movie-page">
          <Pagination paginate={paginate} currentPageIndex={currentPageIndex} totalPageIndex={10} />
        </div>
      </div>
      <Grid images={imagesArray} />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
});

export default connect(mapStateToProps, {})(MainContent);
