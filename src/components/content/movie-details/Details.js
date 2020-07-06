import React from "react";
import "./Details.scss";
import Rating from "../rating/Rating";
import Tabs from "./tab/Tabs";
import Overview from "./overview/Overview";
import Cast from "./cast/Cast";
import Media from "./media/Media";
import Review from "./review/Review";

const Details = () => (
  <div className="details-wrapper">
    <div className="details-bg" style={{ backgroundImage: "" }}></div>
    <div className="details-overlay"></div>
    <div className="details-movie">
      <div className="movie-image">
        <img src="" alt="" />
      </div>
      <div className="details-body">
        <div className="details-overview">
          <div className="details-title">
            MovieTitle <span>xxxx-xx-xx</span>
          </div>
          <div className="details-moviegenre">
            <ul className="details-moviegenre-lists">
              <li>アクション</li>
              <li>コメディ</li>
              <li>SF</li>
            </ul>
          </div>
          <div className="rating">
            <Rating className="rating-stars" rating={7.5} totalStars={10} />
            &nbsp;
            <span>7.5</span> <p>(200)レビュー</p>
          </div>
          <Tabs>
            <div label="overview">
              <Overview />
            </div>
            <div label="cast">
              <Cast />
            </div>
            <div label="media">
              <Media />
            </div>
            <div label="review">
              <Review />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

export default Details;
