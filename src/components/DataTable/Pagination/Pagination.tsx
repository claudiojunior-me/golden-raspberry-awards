import React from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};

const Pagination = ({ page, totalPages, setPage, isFirstPage, isLastPage }: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(0, page - 5);
    const endPage = Math.min(totalPages - 1, page + 5);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div data-testid='pagination-container' className={styles.pagination}>
      <button
        data-testid='first-page-button'
        onClick={() => setPage(0)}
        disabled={isFirstPage}
        className={styles.pageButton}
      >
        <span>&#10094;&#10094;</span>
      </button>
      <button
        data-testid='previous-page-button'
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={isFirstPage}
        className={styles.pageButton}
      >
        <span>&#10094;</span>
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`${styles.pageButton} ${pageNumber === page ? styles.activePage : ''}`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        data-testid='next-page-button'
        onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
        disabled={isLastPage}
        className={styles.pageButton}
      >
        <span>&#10095;</span>
      </button>
      <button
        data-testid='last-page-button'
        onClick={() => setPage(totalPages - 1)}
        disabled={isLastPage}
        className={styles.pageButton}
      >
        <span>&#10095;&#10095;</span>
      </button>
    </div>
  );
};

export default Pagination;