import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { currentPageIndex, totalPageIndex, paginate } = props;
  const [pageNumber, setPageNumber] = useState();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    setPageNumber(currentPageIndex);
    setTotalPageNumber(totalPageIndex);
  }, [currentPageIndex, totalPageIndex]);
  return (
    <div className="page">
      <span className="page-count">
        {pageNumber} - {totalPageNumber}
      </span>
      <button className={pageNumber > 1 ? "page-btn" : "page-btn inactive"} onClick={() => paginate("prev")}>
        前の映画
      </button>
      <button className={pageNumber === totalPageNumber ? "page-btn inactive" : "page-btn"} onClick={() => paginate("next")}>
        次の映画
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  totalPageIndex: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
