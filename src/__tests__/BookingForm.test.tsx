import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from '../components/BookingForm';

describe('BookingForm', () => {
  beforeEach(() => {
    render(<BookingForm />);
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  it('shows validation errors for required fields when submitting empty form', async () => {
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });

  it('validates guest number constraints', async () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '0');
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/at least 1 guest required/i)).toBeInTheDocument();

    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '11');
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  it('allows submission with valid data', async () => {
    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    // Set valid values
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, dateString);
    
    await userEvent.selectOptions(timeSelect, '13:00');
    
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '4');

    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await userEvent.click(submitButton);

    // No validation errors should be present
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/at least/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/maximum/i)).not.toBeInTheDocument();
  });
});