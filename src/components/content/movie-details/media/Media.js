import React from "react";
import "./Media.scss";

const Media = () => (
  <div className="media">
    <div>
      <div className="media-title">予告編</div>
      <div className="media-videos">
        <div className="media-video">
          <iframe
            title="MovieTitle"
            style={{
              width: "100%",
              height: "100%",
            }}
            src={""}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
    <div>
      <div className="media-title">画像(10)</div>
      <div className="media-images">
        <div
          className="image-cell"
          style={{
            backgroundImage: "",
          }}
        ></div>
      </div>
    </div>
  </div>
);

export default Media;
