import React, { useState } from "react";
import "./Styles.scss";

function Pagination({ totalPages, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  console.log("pageNumbers", pageNumbers);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
    paginate(1);
  };

  const handleLastClick = () => {
    setCurrentPage(pageNumbers.length);
    paginate(pageNumbers.length);
  };

  return (
    <div className="pagination">
      <button className="pagination-button" onClick={handleFirstClick}>
        &laquo;
      </button>
      <button className="pagination-button" onClick={handlePrevClick}>
        &lt;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-button ${
            number === currentPage ? "active" : ""
          }`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button className="pagination-button" onClick={handleNextClick}>
        &gt;
      </button>
      <button className="pagination-button" onClick={handleLastClick}>
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
