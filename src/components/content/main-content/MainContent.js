import React, { useState } from "react";
import "./MainContent.scss";
import SlideShow from "../slide-show/SlideShow";
import Pagination from "../pagination/Pagination";

const MainContent = () => {
  const images = [1, 2, 3, 4, 5]; // imageAPI
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
        <div className="movie-type">movie-type</div>
        <div className="movie-page">
          <Pagination paginate={paginate} currentPageIndex={currentPageIndex} totalPageIndex={10} />
        </div>
      </div>
      {/* Display-grid-component */}
    </div>
  );
};

export default MainContent;
