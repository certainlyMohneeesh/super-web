import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ScrollReveal Component', () => {
  it('renders children correctly', () => {
    render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ScrollReveal className="custom-class">
        <div>Test Content</div>
      </ScrollReveal>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});