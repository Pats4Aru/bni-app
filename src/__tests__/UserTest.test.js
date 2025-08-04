
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocation } from 'react-router-dom';
import { User } from '../pages/User.js';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

// Mock the Navbar component
jest.mock('../Components/Navbar.js', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

// Mock the CSS import
jest.mock('../User.css', () => ({}));

describe('User Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with no location state (empty object)', () => {
    useLocation.mockReturnValue({ state: null });

    render(<User />);

    // Check that Navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check default values are displayed
    expect(screen.getByText('Name: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Company: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Email: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Phone: Unknown')).toBeInTheDocument();

    // Check that optional fields are not rendered
    expect(screen.queryByText(/Profession:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Referrer:/)).not.toBeInTheDocument();
  });

  test('renders with complete user data including profession and referrer', () => {
    const mockData = {
      Name: 'John Doe',
      Profession: 'Software Engineer',
      Company: 'Tech Corp',
      Email: 'john.doe@techcorp.com',
      Phone: '555-1234',
      Referrer: 'Jane Smith'
    };

    useLocation.mockReturnValue({ state: mockData });

    render(<User />);

    // Check that all data is displayed correctly
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Profession: Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Company: Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@techcorp.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 555-1234')).toBeInTheDocument();
    expect(screen.getByText('Referrer: Jane Smith')).toBeInTheDocument();
  });

  test('renders with partial user data (no profession, no referrer)', () => {
    const mockData = {
      Name: 'Jane Smith',
      Company: 'Design Studio',
      Email: 'jane@design.com',
      Phone: '555-5678'
    };

    useLocation.mockReturnValue({ state: mockData });

    render(<User />);

    expect(screen.getByText('Name: Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Company: Design Studio')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@design.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 555-5678')).toBeInTheDocument();

    // Optional fields should not be rendered when undefined
    expect(screen.queryByText(/Profession:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Referrer:/)).not.toBeInTheDocument();
  });

  test('renders with empty string values', () => {
    const mockData = {
      Name: '',
      Profession: '',
      Company: '',
      Email: '',
      Phone: '',
      Referrer: ''
    };

    useLocation.mockReturnValue({ state: mockData });

    render(<User />);

    // Empty strings should fallback to "Unknown"
    expect(screen.getByText('Name: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Profession: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Company: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Email: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Phone: Unknown')).toBeInTheDocument();
    expect(screen.getByText('Referrer: Unknown')).toBeInTheDocument();
  });

  test('renders profession when defined but referrer when undefined', () => {
    const mockData = {
      Name: 'Bob Johnson',
      Profession: 'Manager',
      Company: 'Business Inc',
      Email: 'bob@business.com',
      Phone: '555-9999'
      // Referrer is undefined
    };

    useLocation.mockReturnValue({ state: mockData });

    render(<User />);

    expect(screen.getByText('Name: Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Profession: Manager')).toBeInTheDocument();
    expect(screen.getByText('Company: Business Inc')).toBeInTheDocument();
    expect(screen.getByText('Email: bob@business.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 555-9999')).toBeInTheDocument();

    // Profession should be shown, Referrer should not
    expect(screen.queryByText(/Referrer:/)).not.toBeInTheDocument();
  });

  test('renders referrer when defined but profession when undefined', () => {
    const mockData = {
      Name: 'Alice Brown',
      Company: 'Consulting LLC',
      Email: 'alice@consulting.com',
      Phone: '555-7777',
      Referrer: 'Previous Client'
      // Profession is undefined
    };

    useLocation.mockReturnValue({ state: mockData });

    render(<User />);

    expect(screen.getByText('Name: Alice Brown')).toBeInTheDocument();
    expect(screen.getByText('Company: Consulting LLC')).toBeInTheDocument();
    expect(screen.getByText('Email: alice@consulting.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 555-7777')).toBeInTheDocument();
    expect(screen.getByText('Referrer: Previous Client')).toBeInTheDocument();

    // Referrer should be shown, Profession should not
    expect(screen.queryByText(/Profession:/)).not.toBeInTheDocument();
  });
});