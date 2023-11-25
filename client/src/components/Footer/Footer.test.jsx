import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { hexToRgb } from '@mui/material';

describe('Footer Component', () => {
    it('renders the copyright year and author name', () => {
        render(<Footer />);
        const copyrightText = screen.getByText(`© ${new Date().getFullYear()} Deyan Slavov`);
        expect(copyrightText).toBeInTheDocument();
    });

    it('renders GitHub and LinkedIn icons with correct URLs', () => {
        render(<Footer />);
        const githubIcon = screen.getByLabelText('GitHub');
        const linkedInIcon = screen.getByLabelText('LinkedIn');

        expect(githubIcon.closest('a')).toHaveAttribute('href', 'https://github.com/didoslavov/rButler');
        expect(linkedInIcon.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/deyan-slavov-14648a207/');
    });

    it('displays tooltips with correct information', () => {
        render(<Footer />);
        const githubIcon = screen.getByRole('github-button');
        const linkedInIcon = screen.getByRole('linkedin-button');

        expect(githubIcon.closest('a')).toHaveAttribute('aria-label', 'GitHub');
        expect(linkedInIcon.closest('a')).toHaveAttribute('aria-label', 'LinkedIn');
    });

    it('applies the correct styles', () => {
        render(<Footer />);
        const footer = screen.getByTestId('footer');
        const styles = getComputedStyle(footer);

        expect(styles.backgroundColor).toBe(hexToRgb('#ecebe9'));
    });

    it('applies the correct styles to tooltips', () => {
        render(<Footer />);
        const githubIcon = screen.getByRole('github-button');
        const linkedInIcon = screen.getByRole('linkedin-button');

        const githubTooltipStyles = getComputedStyle(githubIcon);
        const linkedInTooltipStyles = getComputedStyle(linkedInIcon);

        expect(githubTooltipStyles.color).toBe(hexToRgb('#2d475a'));
        expect(linkedInTooltipStyles.color).toBe(hexToRgb('#2d475a'));
    });
});
