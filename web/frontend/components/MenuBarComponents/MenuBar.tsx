import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

const pages = [
    {
        title: 'Getting Started',
        href: '/GettingStarted'
    },
    {
        title: 'Quotes',
        href: '/Quotes'
    },
    {
        title: 'Setting',
        href: '/Setting'
    },
]


function ResponsiveAppBar(props: any) {
    const history = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (href: string) => {
        history(href)
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" className="app-bar">
            <Container maxWidth="xl">
                <Toolbar disableGutters variant="dense">
                    <Typography> &nbsp;&nbsp;&nbsp;</Typography>
                    <Avatar
                        alt="Remy Sharp"
                        src="/assets/vifylog.png"
                        sx={{width: 24, height: 24}}
                    />
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title}
                                          onClick={() => handleCloseNavMenu(page.href)}
                                          divider={true}
                                >

                                    <Typography textAlign="center"
                                                variant="h5"
                                                noWrap
                                                component="a"
                                                sx={{
                                                    mr: 2,
                                                    display: {xs: 'flex', md: 'none'},
                                                    flexGrow: 1,
                                                    fontFamily: 'Apple LiSung',
                                                    fontWeight: 200,
                                                    letterSpacing: '.3rem',
                                                    color: 'primary',
                                                    textDecoration: 'none',
                                                }}

                                    >{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (

                            <Button
                                key={page.title}
                                onClick={() => handleCloseNavMenu(page.href)}
                                sx={{my: 0.5, color: 'white', display: 'block', fontweight: 'medium'}}
                            >
                                {page.title}&nbsp;&nbsp;
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;