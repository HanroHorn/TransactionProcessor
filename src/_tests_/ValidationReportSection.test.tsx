import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ValidationReportSection from '../components/ValidationReporSection';
import React from 'react';

jest.mock('react-bootstrap', () => ({
  Alert: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('react-icons/fa6', () => ({
  FaCircleExclamation: () => <span>Icon</span>,
}));


describe('test ValidationReportSection component', () => {
  it('should render the transaction ID and list of validation errors correctly', () => {
    const validationError = {
      transactionReference: 12345,
      validationErrors: [
        'Invalid transaction reference.',
        'Start balance is not a valid numerical value.',
        'End Balance is not accurately calculated.',
      ],
    };

    render(
      <ValidationReportSection sectionIndex={1} validationError={validationError} />
    );

    // Check if transaction ID is rendered correctly
    expect(screen.getByText(/Transaction ID: 12345/i)).toBeInTheDocument();

    // Check if all validation errors are rendered
    expect(screen.getByText(/Invalid transaction reference./i)).toBeInTheDocument();
    expect(screen.getByText(/Start balance is not a valid numerical value./i)).toBeInTheDocument();
    expect(screen.getByText(/End Balance is not accurately calculated./i)).toBeInTheDocument();

    // Check if icons are rendered for each error
    const icons = screen.getAllByText(/Icon/i);
    expect(icons).toHaveLength(3);
  });
});
