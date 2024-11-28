import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import { act } from 'react';

describe('DataTable', () => {
  it('renders table with data and columns', () => {
    const columns: { key: 'name' | 'age'; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ];

    const data = [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
    ];

    render(<DataTable columns={columns} data={data} />);

    // Verificar se os cabeçalhos estão presentes
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();

    // Verificar se os dados estão presentes
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/28/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/34/i)).toBeInTheDocument();
  });

  it('renders table with filter elements', () => {
    const columns: { key: 'name' | 'age'; label: string; filterElement?: React.ReactNode }[] = [
      { key: 'name', label: 'Name', filterElement: <input placeholder="Filter by name" /> },
      { key: 'age', label: 'Age', filterElement: <input placeholder="Filter by age" /> },
    ];

    const data = [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
    ];

    render(<DataTable columns={columns} data={data} />);

    // Verificar se os cabeçalhos estão presentes
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();

    // Verificar se os elementos de filtro estão presentes
    expect(screen.getByPlaceholderText(/Filter by name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Filter by age/i)).toBeInTheDocument();
  });

  it('renders table with pagination', async () => {
    const columns: { key: 'name' | 'age'; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ];

    const data = [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
    ];

    const paginationProps = {
      page: 2,
      totalPages: 4,
      setPage: jest.fn(),
      isFirstPage: false,
      isLastPage: false,
    };

    render(<DataTable columns={columns} data={data} paginationProps={paginationProps} />);

    // Verify headers
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Age/i)).toBeInTheDocument();

    // Verify data
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/28/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/34/i)).toBeInTheDocument();

    // Verify pagination
    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    expect(screen.getByTestId('first-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('previous-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();

    // Verify pagination buttons are enabled/disabled correctly
    expect(screen.getByTestId('first-page-button')).not.toBeDisabled();
    expect(screen.getByTestId('previous-page-button')).not.toBeDisabled();
    expect(screen.getByTestId('next-page-button')).not.toBeDisabled();
    expect(screen.getByTestId('last-page-button')).not.toBeDisabled();

    // Simulate clicking first page button
    await act(async () => {
      fireEvent.click(screen.getByTestId('first-page-button'));
      expect(paginationProps.setPage).toHaveBeenCalledWith(0);
    });

    // Simulate clicking previous page button
    await act(async () => {
      fireEvent.click(screen.getByTestId('previous-page-button'));
      expect(paginationProps.setPage).toHaveBeenCalledWith(1);
    });

    // Simulate clicking next page button
    await act(async () => {
      fireEvent.click(screen.getByTestId('next-page-button'));
      expect(paginationProps.setPage).toHaveBeenCalledWith(3);
    });

    // Simulate clicking last page button
    await act(async () => {
      fireEvent.click(screen.getByTestId('last-page-button'));
      expect(paginationProps.setPage).toHaveBeenCalledWith(3);
    });
  });

  it('renders table with formatted data', () => {
    const columns: { key: 'name' | 'age'; label: string; formatData?: (data: string) => string }[] = [
      { key: 'name', label: 'Name', formatData: (data) => data.toUpperCase() },
      { key: 'age', label: 'Age', formatData: (data) => `Age: ${data}` },
    ];

    const data = [
      { name: 'John Doe', age: 28 },
      { name: 'Jane Smith', age: 34 },
    ];

    render(<DataTable columns={columns} data={data} />);

    // Verify formatted data
    expect(screen.getByText(/JOHN DOE/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 28/i)).toBeInTheDocument();
    expect(screen.getByText(/JANE SMITH/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 34/i)).toBeInTheDocument();
  });
});