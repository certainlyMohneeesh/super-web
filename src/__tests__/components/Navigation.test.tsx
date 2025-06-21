import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navigation } from '@/components/ui/Navigation';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Navigation Component', () => {
  const defaultProps = {
    cartCount: 0,
    onCartClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation items correctly', () => {
    render(<Navigation {...defaultProps} />);

    expect(screen.getByText('MR.POPS')).toBeInTheDocument();
    expect(screen.getByText('Flavours')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays cart count when items are added', () => {
    render(<Navigation {...defaultProps} cartCount={3} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onCartClick when cart button is clicked', () => {
    const mockCartClick = jest.fn();
    render(<Navigation {...defaultProps} onCartClick={mockCartClick} />);

    const cartButton = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartButton);

    expect(mockCartClick).toHaveBeenCalledTimes(1);
  });

  it('opens mobile menu when menu button is clicked', async () => {
    render(<Navigation {...defaultProps} />);

    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
    });
  });

  it('closes mobile menu when close button is clicked', async () => {
    render(<Navigation {...defaultProps} />);

    // Open menu first
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);

    // Then close it
    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toHaveClass('mobile-menu-open');
    });
  });

  it('has correct accessibility attributes', () => {
    render(<Navigation {...defaultProps} />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Main navigation');

    const menuButton = screen.getByLabelText(/toggle menu/i);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('displays correct cart count with zero items', () => {
    render(<Navigation {...defaultProps} cartCount={0} />);

    const cartButton = screen.getByRole('button', { name: /cart/i });
    expect(cartButton).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument(); // Should not show 0
  });

  it('handles large cart counts correctly', () => {
    render(<Navigation {...defaultProps} cartCount={99} />);

    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
