import React, { useState } from "react";
import "./MainContent.scss";
import SlideShow from "../slide-show/SlideShow";
import Pagination from "../pagination/Pagination";
import Grid from "../grid/Grid";

const MainContent = () => {
  const images = [
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
      <Grid images={images} />
    </div>
  );
};

export default MainContent;
