import { AppBar, Container, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { footerStyle } from '../../styles/muiStyles/muiStyles.js';

const Footer = () => {
    return (
        <AppBar position="relative" style={footerStyle} className="footer">
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
                                href="https://github.com/didoslavov/SoftUni-Progress/tree/main/React%20JS/React%20Final%20Project"
                                target="_blank">
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
                                target="_blank">
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
