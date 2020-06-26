import React, { useState, useEffect } from "react";
import "./SlideShow.scss";
import PropTypes from "prop-types";

const SlideShow = (props) => {
  const { images, auto, arrows } = props;
  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const { slideShow, slideIndex } = state;

  let currentSlideIndex = 0;

  const autoSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;

    setState((prev) => ({
      ...prev,
      slideIndex: currentSlideIndex,
      slideShow: images[currentSlideIndex],
    }));
  };

  const [slideInterval, setSlideInterval] = useState(0);

  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        autoSlide();
      }, 3000);
      setSlideInterval(interval);

      return () => {
        clearInterval(interval);
        clearInterval(slideInterval);
      };
    }
    // eslint-disable-next-line
  }, []);

  const moveSlideArrow = (type) => {
    let i = currentIndex;
    if (type === "prev") {
      if (currentIndex <= 0) {
        i = images.length - 1;
      } else {
        i--;
      }
    } else if (type === "next") {
      if (currentIndex >= images.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }
    setCurrentIndex(i);
    setState((prev) => ({
      ...prev,
      slideIndex: i,
      slideShow: images[i],
    }));
  };

  const SlideArrows = () => (
    <div className="slide-arrows">
      <div className="slide-arrow slide-arrow-left" onClick={() => moveSlideArrow("prev")}></div>
      <div className="slide-arrow slide-arrow-right" onClick={() => moveSlideArrow("next")}></div>
    </div>
  );

  const Indicator = (props) => {
    const { currentSlide } = props;
    const slideIndicator = images.map((slide, i) => {
      const btnClass = i === currentSlide ? "slide-nav-btn slide-nav-btn-active" : "slide-nav-btn";
      return <button className={btnClass} key={i}></button>;
    });
    return <div className="slide-nav">{slideIndicator}</div>;
  };

  return (
    <div className="slide">
      <div className="slide-content">{images && images.length && slideShow && <div className="slide-image" style={{ backgroundImage: `url(${slideShow.url})` }}></div>}</div>
      <Indicator currentSlide={slideIndex} />
      {!arrows ? <SlideArrows /> : null}
    </div>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool.isRequired,
  arrows: PropTypes.bool.isRequired,
  currentSlide: PropTypes.number,
};

export default SlideShow;
