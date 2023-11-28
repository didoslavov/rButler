import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LearnMore from './LearnMore';
import { BrowserRouter } from 'react-router-dom';

describe('LearnMore component', () => {
    test('renders welcome message', () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        expect(screen.getByText('Welcome to Your Digital Household Manager!')).toBeInTheDocument();
    });

    test('renders user registration and login section', async () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        const registrationSection = screen.getByText('User Registration and Login');
        expect(registrationSection).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/create an account or log in/i)).toBeInTheDocument();
        });
    });

    test('renders creating a digital household section', () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        const creationSection = screen.getByText('Creating a Digital Household');
        expect(creationSection).toBeInTheDocument();
        expect(screen.getByText(/organize your digital households/i)).toBeInTheDocument();
    });

    test('renders managing digital households section', () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        const managementSection = screen.getByText('Managing Digital Households');
        expect(managementSection).toBeInTheDocument();
        expect(screen.getByText(/edit or delete your digital households/i)).toBeInTheDocument();
    });

    test('renders information section', () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        const informationSection = screen.getByText('Information');
        expect(informationSection).toBeInTheDocument();
        expect(screen.getByText(/for more detailed information please refer to the/i)).toBeInTheDocument();
    });

    test('renders link to github page', () => {
        render(
            <BrowserRouter>
                <LearnMore />
            </BrowserRouter>
        );
        const githubLink = screen.getByText(/github page/i);
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/didoslavov/rButler');
    });
});
