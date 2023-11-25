import { AppBar, Container, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { footerStyle } from '../../styles/muiStyles/muiStyles.js';

const Footer = () => {
    return (
        <AppBar position="relative" style={footerStyle} className="footer" data-testid="footer">
            <Container>
                <Toolbar>
                    <Typography variant="inherit">&copy; {new Date().getFullYear()} Deyan Slavov</Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Tooltip
                            title="Project GitHub"
                            placement="top"
                            sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                            <IconButton
                                color="inherit"
                                aria-label="GitHub"
                                href="https://github.com/didoslavov/rButler"
                                target="_blank"
                                role="github-button">
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Author LinkedIn"
                            placement="top"
                            sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                            <IconButton
                                color="inherit"
                                aria-label="LinkedIn"
                                href="https://www.linkedin.com/in/deyan-slavov-14648a207/"
                                target="_blank"
                                role="linkedin-button">
                                <LinkedInIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;
