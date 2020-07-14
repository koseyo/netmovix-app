import React, { useState } from "react";
import "./Media.scss";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../../../API/movieAPI";
import PropTypes from "prop-types";

const Media = (props) => {
  const { movie } = props;
  const [media] = useState(movie[2]);
  const [video] = useState(movie[3]);

  return (
    <div className="media">
      <div>
        <div className="media-title">関連動画</div>
        <div className="media-videos">
          {video.results.map((data) => (
            <div className="media-video" key={data.key}>
              <iframe
                title="MovieTitle"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={`https://www.youtube.com/embed/${data.key}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="media-title">画像({media.posters.length})</div>
        <div className="media-images">
          {media.posters.map((data, i) => (
            <div
              key={i}
              className="image-cell"
              style={{
                backgroundImage: `url(${IMAGE_URL}${data.file_path})`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

Media.propTypes = {
  movie: PropTypes.array,
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
});

export default connect(mapStateToProps, {})(Media);
