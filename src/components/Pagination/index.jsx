import React, { useState } from "react";
import "./Styles.scss";
import { usePagination } from "../../utils/usePagination";

function Pagination({ totalPages, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: 2,
    pageSize: 1,
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange?.length - 1];

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
      <button
        disabled={currentPage === 1}
        className="pagination-button"
        onClick={handleFirstClick}
      >
        &laquo;
      </button>
      <button
        disabled={currentPage === 1}
        className="pagination-button"
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      {paginationRange.map((number) => (
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
      <button
        disabled={currentPage === lastPage}
        className="pagination-button"
        onClick={handleNextClick}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === lastPage}
        className="pagination-button"
        onClick={handleLastClick}
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
