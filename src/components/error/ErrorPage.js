import React from "react";
import "./ErrorPage.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setError } from "../../redux/action/errors";
import PropTypes from "prop-types";

const ErrorPage = ({ clearState, setError }) => {
  const history = useHistory();
  const navigateToHome = () => {
    setError({ message: "", statusCode: null });
    clearState();
    history.push("/");
  };

  return (
    <div className="error-page">
      <h1 className="error-header">エラーが発生しました</h1>
      <p className="error-message">このページは存在しません</p>
      <div className="error-link" onClick={() => navigateToHome}>
        <i className="icon-home"></i> ホーム画面へ戻ります
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  clearState: PropTypes.func,
  setError: PropTypes.func,
};

export default connect(null, { setError })(ErrorPage);
