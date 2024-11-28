'use client';

import { useState, useEffect } from 'react';
import styles from './Movies.module.css';
import DataTable from '@/components/DataTable';
import { fetchMovies } from '@/lib/fetchData';
import { Movie } from '@/types/movie';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [year, setYear] = useState('');
  const [winner, setWinner] = useState<boolean | null>(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevYear, setPrevYear] = useState('');
  const [prevWinner, setPrevWinner] = useState<boolean | null>(false);

  const getMovies = async () => {
    if (year !== prevYear || winner !== prevWinner) {
      setPage(0);
    }

    const data = await fetchMovies(year, page, winner);
    setMovies(data.content);
    setTotalPages(data.totalPages);
    setPrevYear(year);
    setPrevWinner(winner);
  };

  useEffect(() => {
    getMovies();
  }, [year, winner, page]);

  const filterByYearElement = (
    <input
      type="number"
      placeholder='Filter by year'
      value={year}
      onChange={(e) => setYear(e.target.value)}
    />
  )

  const filterByWinnerElement = (
    <select
      value={String(winner)}
      onChange={(e) => setWinner(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
      className={styles.filterSelect}
    >
      <option value="">All</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List movies</h1>

      <DataTable
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'year', label: 'Year', filterElement: filterByYearElement },
          { key: 'title', label: 'Title' },
          {
            key: 'winner',
            label: 'Winner?',
            filterElement: filterByWinnerElement,
            formatData: (data: string) => (data === 'true' ? 'Yes' : 'No'),
          },
        ]}
        data={movies}
        paginationProps={{
          page,
          totalPages,
          setPage,
          isFirstPage: page === 0,
          isLastPage: page === totalPages - 1,
        }}
      />
    </div>
  );
}
