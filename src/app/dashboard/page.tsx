'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Dashboard.module.css';
import DataTable from '@/components/DataTable';
import {
  fetchYearsWithMultipleWinners,
  fetchStudiosWithMostWins,
  fetchProducersIntervals,
  fetchWinnersByYear
} from '@/lib/fetchData';
import { debounce } from '@/utils/debounce';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] = useState([]);
  const [studiosWithMostWins, setStudiosWithMostWins] = useState([]);
  const [producersIntervals, setProducersIntervals] = useState({ min: [], max: [] });
  const [winnersByYear, setWinnersByYear] = useState([]);
  const [searchYear, setSearchYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setYearsWithMultipleWinners(await fetchYearsWithMultipleWinners());
      setStudiosWithMostWins(await fetchStudiosWithMostWins());
      setProducersIntervals(await fetchProducersIntervals());
    };

    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchWinners = useCallback(
    debounce(async (year: string) => {
      try {
        setIsLoading(true);
        setWinnersByYear(await fetchWinnersByYear(year));
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (searchYear?.length === 4) {
      fetchWinners(searchYear);
    }
  }, [searchYear, fetchWinners]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > new Date().getFullYear()) {
      return;
    }

    setSearchYear(e.target.value);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.panel}>
        <h2>List years with multiple winners</h2>
        <DataTable
          columns={[
            { key: 'year', label: 'Year' },
            { key: 'winnerCount', label: 'Win Count' },
          ]}
          data={yearsWithMultipleWinners}
        />
      </div>

      <div className={styles.panel}>
        <h2>Top 3 studios with winners</h2>
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'winCount', label: 'Win Count' },
          ]}
          data={studiosWithMostWins.slice(0, 3)}
        />
      </div>

      <div className={styles.panel}>
        <h2>Producers with longest and shortest interval between wins</h2>

        <h4>Maximum</h4>
        <DataTable
          columns={[
            { key: 'producer', label: 'Producer' },
            { key: 'interval', label: 'Interval' },
            { key: 'previousWin', label: 'Previous Year' },
            { key: 'followingWin', label: 'Following Year' },
          ]}
          data={producersIntervals.max}
        />

        <h4>Minimum</h4>
        <DataTable
          columns={[
            { key: 'producer', label: 'Producer' },
            { key: 'interval', label: 'Interval' },
            { key: 'previousWin', label: 'Previous Year' },
            { key: 'followingWin', label: 'Following Year' },
          ]}
          data={producersIntervals.min}
        />
      </div>

      <div className={styles.panel}>
        <h2>List movie winners by year</h2>
        <div className={styles.searchContainer}>
          <input
            disabled={isLoading}
            type="number"
            placeholder="Filter by year"
            value={searchYear}
            onChange={handleSearchChange}
            className={styles.input}
          />
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Id' },
            { key: 'year', label: 'Year' },
            { key: 'title', label: 'Title' },
          ]}
          data={winnersByYear}
        />
      </div>
    </div>
  );
}
