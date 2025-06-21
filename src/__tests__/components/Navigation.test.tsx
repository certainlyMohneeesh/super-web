import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation Component', () => {
  it('renders navigation items correctly', () => {
    render(<Navigation cartCount={0} onCartClick={() => {}} />);

    expect(screen.getByText('MR.POPS')).toBeInTheDocument();
    expect(screen.getByText('Flavours')).toBeInTheDocument();
  });

  it('displays cart count when items are added', () => {
    render(<Navigation cartCount={3} onCartClick={() => {}} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('opens menu when menu button is clicked', () => {
    render(<Navigation cartCount={0} onCartClick={() => {}} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

// package.json test scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html"
  }
}
