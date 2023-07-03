import * as React from 'react';
import {useState} from 'react';
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
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import CabinTTF from 'components/fonts/Cabin-Regular-TTF.ttf'
// import GillSansNovaTTF from 'components/fonts/GillSansNova-CnMedium.ttf'
// import SFPro from '../fonts/SF-Pro-Rounded-Medium.otf'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Avatar from '@mui/material/Avatar';

//
// const SFPro = {
//     fontFamily: 'SFPro',
//     fontStyle: 'normal',
//     fontWeight: 500,
//     src: `url(${SFPro}) format('truetype')`,
// }
// const theme = createTheme({
//     typography: {
//         fontFamily: "sans-serif",
//         // fontSize: "3rem",
//         button: {
//             textTransform: "none",
//             fontFamily: 'sans-serif',
//             fontStyle: 'normal',
//             fontWeight: 500,
//             fontSize:"1.2rem"
//         }
//     },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: {
//                 "@font-face": {
//                     fontFamily: "sans-serif",
//                 },
//                 body: {
//                     fontSize: "4rem",
//                     color: "purple"
//                 },
//                 button: {
//                     textTransform: "none"
//                 }
//             }
//         }
//     }
// });

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
        title: 'Products',
        href: '/Products'
    },
    {
        title: 'Setting',
        href: '/Setting'
    },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar(props: any) {
    const history = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log("abc")
        setAnchorElNav(event.currentTarget);
        // console.log(event.currentTarget.nodeValue)
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (href: string) => {
        history(href)
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // functions and variables for Drawers :
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState(open);
            console.log("state", state)
        };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
            <AppBar position="sticky" className="app-bar">
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant="dense">
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={toggleDrawer(true)}
                        >
                            <DensityMediumIcon sx={{ color: 'secondary' }}/>
                            <SwipeableDrawer
                                // anchor={{'left'}}
                                open={state}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                {list()}
                            </SwipeableDrawer>
                        </IconButton>
                        <Typography> &nbsp;&nbsp;&nbsp;</Typography>
                        <Avatar
                            alt="Remy Sharp"
                            src="/assets/vifylog.png"
                            sx={{ width: 24, height: 24 }}
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
                                        {/*<Typography textAlign="center"*/}
                                        {/*            sx={{*/}
                                        {/*                mr: 2,*/}
                                        {/*                // display: {xs: 'flex', md: 'none'},*/}
                                        {/*                flexGrow: 1,*/}
                                        {/*                fontFamily: 'Apple LiSung',*/}
                                        {/*                fontWeight: 200,*/}
                                        {/*                letterSpacing: '.3rem',*/}
                                        {/*                color: 'primary',*/}
                                        {/*            }}*/}

                                        {/*>ABC Test</Typography>*/}
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
                                // <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "#1a237e",height:2 }}/>

                            ))}
                        </Box>


                        {/*<Box sx={{flexGrow: 0}}>*/}
                        {/*    <Tooltip title="Open settings">*/}
                        {/*        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
                        {/*            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                        {/*        </IconButton>*/}
                        {/*    </Tooltip>*/}
                        {/*    <Menu*/}
                        {/*        sx={{mt: '45px'}}*/}
                        {/*        id="menu-appbar"*/}
                        {/*        anchorEl={anchorElUser}*/}
                        {/*        anchorOrigin={{*/}
                        {/*            vertical: 'top',*/}
                        {/*            horizontal: 'right',*/}
                        {/*        }}*/}
                        {/*        keepMounted*/}
                        {/*        transformOrigin={{*/}
                        {/*            vertical: 'top',*/}
                        {/*            horizontal: 'right',*/}
                        {/*        }}*/}
                        {/*        open={Boolean(anchorElUser)}*/}
                        {/*        onClose={handleCloseUserMenu}*/}
                        {/*    >*/}
                        {/*        {settings.map((setting) => (*/}
                        {/*            <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                        {/*                <Typography textAlign="center">{setting}</Typography>*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </Menu>*/}
                        {/*</Box>*/}
                    </Toolbar>
                </Container>
            </AppBar>
    );
}

export default ResponsiveAppBar;