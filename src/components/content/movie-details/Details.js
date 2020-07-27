import React, { useState, useEffect } from "react";
import "./Details.scss";
import Rating from "../rating/Rating";
import Tabs from "./tab/Tabs";
import Overview from "./overview/Overview";
import Cast from "./cast/Cast";
import Media from "./media/Media";
import Review from "./review/Review";
import Spinner from "../../spinner/Spinner";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { movieDetails } from "../../../redux/action/movie";
import { IMAGE_URL } from "../../../API/movieAPI";
import { pathURL } from "../../../redux/action/routes";
import PropTypes from "prop-types";

const Details = (props) => {
  const { movieDetails, movie, pathURL, match } = props;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    pathURL(match.path, match.url);
    if (movie.length === 0) {
      movieDetails(id);
    }
    setDetails(movie[0]);
    // eslint-disable-next-line
  }, [id, movie]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        details && (
          <div className="details-wrapper">
            <div className="details-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.backdrop_path})` }}></div>
            <div className="details-overlay"></div>
            <div className="details-movie">
              <div className="details-movie-image">
                <img src={`${IMAGE_URL}${details.poster_path}`} alt="" />
              </div>
              <div className="details-body">
                <div className="details-overview">
                  <div className="details-title">
                    {details.title} <span>{details.release_date}</span>
                  </div>
                  <div className="details-moviegenre">
                    <ul className="details-moviegenre-lists">{details && details.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}</ul>
                  </div>
                  <div className="rating">
                    <Rating className="rating-stars" rating={details.vote_average} totalStars={10} />
                    &nbsp;
                    <span>{details.vote_average}</span> <p>({details.vote_count}) レビュー</p>
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
        )
      )}
    </>
  );
};

Details.propTypes = {
  movie: PropTypes.array,
  movieDetails: PropTypes.func,
  pathURL: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
});

export default connect(mapStateToProps, { movieDetails, pathURL })(Details);
