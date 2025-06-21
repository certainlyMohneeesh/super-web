import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock all the heavy components
jest.mock('@/components/sections/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero Section</div>
}));

jest.mock('@/components/sections/Experience', () => ({
  Experience: () => <div data-testid="experience">Experience Section</div>
}));

jest.mock('@/components/sections/Flavours', () => ({
  Flavours: () => <div data-testid="flavours">Flavours Section</div>
}));

describe('Home Page', () => {
  it('renders all main sections', () => {
    render(<Home />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('flavours')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<Home />);

    expect(screen.getByText('MR.POPS')).toBeInTheDocument();
    expect(screen.getByText(/Premium ice cream experience/)).toBeInTheDocument();
  });
});