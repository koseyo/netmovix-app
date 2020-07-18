import React from "react";
import "./Spinner.scss";

const Spinner = () => (
  <div className="spinner" data-testid="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
);

export default Spinner;
