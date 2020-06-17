import React from "react";
import "./MainContent.scss";
import SlideShow from "../slide-show/SlideShow";

const MainContent = () => {
  const images = [1, 2, 3, 4, 5];
  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} arrows={true} />
      <div className="movie-title">
        <div className="movie-type">movie-type</div>
        <div className="movie-page">movie-page</div>
      </div>
      {/* Display-grid-component */}
    </div>
  );
};

export default MainContent;
