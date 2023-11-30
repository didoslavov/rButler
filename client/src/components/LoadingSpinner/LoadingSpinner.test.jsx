import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner component', () => {
    test('renders without crashing', () => {
        render(<LoadingSpinner />);
    });

    test('renders the loading spinner', () => {
        const { getByTestId } = render(<LoadingSpinner />);
        const loadingSpinner = getByTestId('loading-spinner');
        expect(loadingSpinner).toBeInTheDocument();
    });
});
