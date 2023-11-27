import React from 'react';
import { render, screen } from '@testing-library/react';
import HouseholdItem from './HouseholdItem';

const mockHousehold = {
    name: 'Test Household',
    presentation: 'A wonderful place',
    master: {
        username: 'testuser',
    },
};

describe('HouseholdItem Component', () => {
    it('renders household name', () => {
        render(<HouseholdItem household={mockHousehold} />);
        expect(screen.getByText('Test Household')).toBeInTheDocument();
    });

    it('renders household presentation', () => {
        render(<HouseholdItem household={mockHousehold} />);
        expect(screen.getByText('A wonderful place')).toBeInTheDocument();
    });

    it('renders owner username', () => {
        render(<HouseholdItem household={mockHousehold} />);
        expect(screen.getByText('Owner: testuser')).toBeInTheDocument();
    });

    it('does not render a non-existent property', () => {
        render(<HouseholdItem household={{ name: 'Test Household' }} />);
        expect(screen.queryByText('Owner:')).toBeNull();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<HouseholdItem household={mockHousehold} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
