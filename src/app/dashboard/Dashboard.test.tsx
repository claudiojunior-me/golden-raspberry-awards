import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Dashboard from './page';
import { fetchYearsWithMultipleWinners, fetchStudiosWithMostWins, fetchProducersIntervals, fetchWinnersByYear } from '@/lib/fetchData';

jest.mock('@/lib/fetchData');

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders years with multiple winners', async () => {
    jest.mocked(fetchYearsWithMultipleWinners).mockResolvedValue([{ year: 2020, winnerCount: 2 }]);
    jest.mocked(fetchStudiosWithMostWins).mockResolvedValue([]);
    jest.mocked(fetchProducersIntervals).mockResolvedValue({ min: [], max: [] });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('List years with multiple winners')).toBeInTheDocument();
      expect(screen.getByText('2020')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('renders top 3 studios with winners', async () => {
    jest.mocked(fetchYearsWithMultipleWinners).mockResolvedValue([]);
    jest.mocked(fetchStudiosWithMostWins).mockResolvedValue([{ name: 'Studio A', winCount: 5 }]);
    jest.mocked(fetchProducersIntervals).mockResolvedValue({ min: [], max: [] });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Top 3 studios with winners')).toBeInTheDocument();
      expect(screen.getByText('Studio A')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('renders producers with longest and shortest interval between wins', async () => {
    jest.mocked(fetchYearsWithMultipleWinners).mockResolvedValue([]);
    jest.mocked(fetchStudiosWithMostWins).mockResolvedValue([]);
    jest.mocked(fetchProducersIntervals).mockResolvedValue({
      min: [{ producer: 'Producer A', interval: 1, previousWin: 2012, followingWin: 2014 }],
      max: [{ producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Producers with longest and shortest interval between wins')).toBeInTheDocument();
      expect(screen.getByText('Producer A')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2012')).toBeInTheDocument();
      expect(screen.getByText('2014')).toBeInTheDocument();
      expect(screen.getByText('Producer B')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('1990')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
    });
  });

  it('fetches and displays winners by year when a year is entered', async () => {
    jest.mocked(fetchYearsWithMultipleWinners).mockResolvedValue([]);
    jest.mocked(fetchStudiosWithMostWins).mockResolvedValue([]);
    jest.mocked(fetchProducersIntervals).mockResolvedValue({ min: [], max: [] });
    jest.mocked(fetchWinnersByYear).mockResolvedValue([{ id: 1, year: 2020, title: 'Movie A' }]);

    render(<Dashboard />);

    fireEvent.change(screen.getByPlaceholderText('Filter by year'), { target: { value: '2020' } });

    await waitFor(() => {
      expect(screen.getByText('List movie winners by year')).toBeInTheDocument();
      expect(screen.getByText('Movie A')).toBeInTheDocument();
      expect(screen.getByText('2020')).toBeInTheDocument();
    });
  });

  it('not fetch winners by year when year is less than 4 char', async () => {
    jest.mocked(fetchYearsWithMultipleWinners).mockResolvedValue([]);
    jest.mocked(fetchStudiosWithMostWins).mockResolvedValue([]);
    jest.mocked(fetchProducersIntervals).mockResolvedValue({ min: [], max: [] });
    jest.mocked(fetchWinnersByYear).mockResolvedValue([{ id: 1, year: 2020, title: 'Movie A' }]);

    render(<Dashboard />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Filter by year'), { target: { value: '202' } });
    });

    expect(screen.getByText('List movie winners by year')).toBeInTheDocument();
    expect(fetchWinnersByYear).not.toHaveBeenCalled();
  });
});