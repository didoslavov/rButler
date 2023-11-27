import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import HouseholdList from './HouseholdList';
import { describe } from 'vitest';

const sampleHouseholds = [
    { _id: '1', name: 'Household 1' },
    { _id: '2', name: 'Household 2' },
];

describe('Household list tests', () => {
    test('renders HouseholdList with household items', () => {
        render(
            <BrowserRouter>
                <HouseholdList households={sampleHouseholds} />
            </BrowserRouter>
        );

        const householdsList = screen.getByRole('list', { class: 'households-list' });
        expect(householdsList).toBeInTheDocument();

        const householdItems = screen.getAllByRole('listitem', { class: /my-household-link/i });

        waitFor(() => {
            expect(householdItems).toHaveLength(sampleHouseholds.length);
        });
    });

    it('has accessible names for links', () => {
        const households = [
            { _id: 1, name: 'Household 1', owner: 'User1' },
            { _id: 2, name: 'Household 2', owner: 'User2' },
        ];

        render(
            <BrowserRouter>
                <HouseholdList households={households} />
            </BrowserRouter>
        );

        waitFor(() => {
            expect(screen.getByText('Owner: User1')).toBeInTheDocument();
        });
    });
});
