import React from "react";
import "./ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div className="error-page">
    <h1 className="error-header">エラーが発生しました</h1>
    <p className="error-message">このページは存在しません</p>
    <Link className="error-link" to={"/"}>
      <i className="icon-home"></i> ホーム画面へ戻ります
    </Link>
  </div>
);

export default ErrorPage;
