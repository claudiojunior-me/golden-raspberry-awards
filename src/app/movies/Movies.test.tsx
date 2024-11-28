import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Movies from './page';
import { fetchMovies } from '@/lib/fetchData';

jest.mock('@/lib/fetchData');

const mockMovies = {
  content: [
    { id: 1, title: 'Movie 1', year: 2020, studios: 'Studio 1', producers: 'Producer 1', winner: true },
    { id: 2, title: 'Movie 2', year: 2021, studios: 'Studio 2', producers: 'Producer 2', winner: false },
  ],
  totalPages: 1,
};

describe('Movies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockMovies);
  });

  it('renders the Movies component', async () => {
    render(<Movies />);

    expect(screen.getByText('List movies')).toBeInTheDocument();
    await waitFor(() => expect(fetchMovies).toHaveBeenCalled());
  });

  it('filters movies by year', async () => {
    render(<Movies />);

    const yearInput = screen.getByPlaceholderText('Filter by year');
    fireEvent.change(yearInput, { target: { value: '2020' } });

    await waitFor(() => expect(fetchMovies).toHaveBeenCalledWith('2020', 0, false));
  });

  it('filters movies by winner', async () => {
    render(<Movies />);

    const winnerSelect = screen.getByDisplayValue('No');
    fireEvent.change(winnerSelect, { target: { value: 'true' } });

    await waitFor(() => expect(fetchMovies).toHaveBeenCalledWith('', 0, true));
  });

  it('not search when year is less than 4 characters', async () => {
    render(<Movies />);

    const yearInput = screen.getByPlaceholderText('Filter by year');
    await act(async () => {
      fireEvent.change(yearInput, { target: { value: '20' } });
    });

    expect(fetchMovies).toHaveBeenCalledTimes(1);
  });

  it('search when year is equal too 4 characters', async () => {
    render(<Movies />);

    const yearInput = screen.getByPlaceholderText('Filter by year');
    await act(async () => {
      fireEvent.change(yearInput, { target: { value: '2018' } });
    });

    expect(fetchMovies).toHaveBeenCalledTimes(2);
  });
});