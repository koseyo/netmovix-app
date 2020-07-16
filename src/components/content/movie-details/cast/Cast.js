import React, { useState } from "react";
import "./Cast.scss";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IMAGE_URL } from "../../../../API/movieAPI";
import PropTypes from "prop-types";

const Cast = (props) => {
  const { movie } = props;
  const [credits] = useState(movie[1]);

  return (
    <div className="cast">
      <div className="cast-title">キャスト・スタッフ</div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th className="cast-head">主な仕事</th>
            <th className="cast-head">役職</th>
          </tr>
        </thead>
        {credits.crew.map((data) => (
          <tbody key={uuidv4()}>
            <tr>
              <td>
                <img src={data.profile_path ? ` ${IMAGE_URL}${data.profile_path}` : "http://placehold.it/54x81"} alt="" />
              </td>
              <td>{data.name}</td>
              <td>{data.department}</td>
              <td>{data.job}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

Cast.propTypes = {
  movie: PropTypes.array,
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie,
});

export default connect(mapStateToProps, {})(Cast);
