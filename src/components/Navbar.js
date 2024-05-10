/* Material imports */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

/* Component imports */
import { useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

/* Toast imports */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Firebase imports */
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase"; //var to use firebase capacities been authenticated
const auth = getAuth(firebaseApp);


const Navbar = ({ user }) => {
    //UseStates vars
    const navigate = useNavigate(); //for v6 of react router is better useNavigate
    const pages = ['Home','News', 'Trending'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const anchorRef = useRef();


    //functions
    const handleLoginRedirect = () =>{
        navigate('/profile');
    }

    const handleHomeRedirect = () =>{
        handleCloseNavMenu();
        navigate('/');
    }
    const handleSignOut = async () =>{
        await signOut(auth)
        .catch((error) => {
            //If we have any error we will have it here
            const errorMessage = error.message;
            notify("Error", errorMessage);
        });

    }
    const notify = (status, message) => {
        if (status === "Error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnFocusLoss: true
            });
        }
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    useEffect(() => {
        if (user) {
            setIsUserLogged(true);
        }else{
            setIsUserLogged(false);
        }
        setTimeout(() => setAnchorElNav(anchorRef?.current), 1);
        setTimeout(() => setAnchorElUser(anchorRef?.current), 1);

    },[user, isUserLogged, anchorRef]);



    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <RssFeedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                        variant="h6"
                        noWrap
                        component='a'
                        to = "/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 300,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Mini blog
                </Typography>
                

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
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
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleHomeRedirect}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <RssFeedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    Mini blog
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleHomeRedirect}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                
                {isUserLogged && 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Profile image" src="#" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLoginRedirect}>
                                <AccountBoxIcon fontSize="small"  sx={{ pr: '5px' }}/> Profile
                            </MenuItem>
                            <MenuItem>
                                <SettingsIcon fontSize="small"  sx={{ pr: '5px' }}/> Settings
                            </MenuItem>
                            <MenuItem onClick={handleSignOut}>
                                <LogoutIcon fontSize="small" sx={{ pr: '5px' }} /> Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                }

                {!isUserLogged && 
                    <Button variant="outlined" color="inherit" onClick={handleLoginRedirect}>Login</Button>
                }

                </Toolbar>
                <ToastContainer limit={3} />
            </Container>
        </AppBar>
     );
}
 
export default Navbar;