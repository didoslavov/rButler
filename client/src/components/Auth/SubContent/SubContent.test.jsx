import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubContent from './SubContent';
import { vi } from 'vitest';

it('renders correctly for sign-up state', () => {
    const { getByText } = render(<SubContent toggleFormsHandler={() => {}} />);

    expect(getByText('Are you a newcomer to these premises?')).toBeInTheDocument();
    expect(getByText('Enroll now and unlock a wealth of fresh possibilities!')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();

    expect(getByText('Ah, might you be a part of our distinguished company?', { hidden: true })).toBeInTheDocument();
    expect(
        getByText(
            'Should you be a prior member, a mere sign-in shall suffice. Your presence has been sorely missed, and we extend a warm welcome back to you.',
            { hidden: true }
        )
    ).toBeInTheDocument();
    expect(getByText('Sign In', { hidden: true })).toBeInTheDocument();
});

it('renders correctly for sign-in state', () => {
    const { getByText } = render(<SubContent toggleFormsHandler={() => {}} />);

    fireEvent.click(getByText('Sign In'));

    expect(getByText('Ah, might you be a part of our distinguished company?')).toBeInTheDocument();
    expect(
        getByText(
            'Should you be a prior member, a mere sign-in shall suffice. Your presence has been sorely missed, and we extend a warm welcome back to you.'
        )
    ).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();

    expect(getByText('Are you a newcomer to these premises?', { hidden: true })).toBeInTheDocument();
    expect(getByText('Enroll now and unlock a wealth of fresh possibilities!', { hidden: true })).toBeInTheDocument();
    expect(getByText('Sign Up', { hidden: true })).toBeInTheDocument();
});

it('calls toggleFormsHandler when the button is clicked', () => {
    const mockToggleFormsHandler = vi.fn();
    const { getByText } = render(<SubContent toggleFormsHandler={mockToggleFormsHandler} />);

    fireEvent.click(getByText('Sign In'));
    fireEvent.click(getByText('Sign Up'));

    expect(mockToggleFormsHandler).toHaveBeenCalled();
});
