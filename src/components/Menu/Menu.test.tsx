import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from './index';

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>; // Simple mock for the Link component
  };
});

describe('Menu', () => {
  test('renders menu with logo and links', () => {
    render(<Menu />);

    // Verify the logo appears
    expect(screen.getByText(/Golden Raspberry/i)).toBeInTheDocument();

    // Verify the links appear
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Lista de Filmes/i)).toBeInTheDocument();
  });

  test('toggles menu open and close', () => {
    render(<Menu />);

    // Verify the menu is initially closed
    expect(screen.queryByTestId('menu-container')).not.toHaveClass('open');

    // Click the hamburger button to open the menu
    fireEvent.click(screen.getByRole('button', { name: /☰/i }));
    expect(screen.getByTestId('menu-container')).toHaveClass('open');

    // Click the hamburger button to close the menu
    fireEvent.click(screen.getByRole('button', { name: /☰/i }));
    expect(screen.getByTestId('menu-container')).not.toHaveClass('open');
  });

  test('shows and hides overlay when menu is toggled', () => {
    render(<Menu />);

    // Verify the overlay is not present initially
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();

    // Click the hamburger button to open the menu
    fireEvent.click(screen.getByRole('button', { name: /☰/i }));
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    // Click the overlay to close the menu
    fireEvent.click(screen.getByTestId('overlay'));
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });
});