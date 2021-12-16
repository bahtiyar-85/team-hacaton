
import React, {useContext, useEffect, useState} from 'react';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "./Navbar.css"
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { cartContext } from '../../contexts/cartContext';
import { productsContext } from '../../contexts/productsContext';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.7),
      width: '70%'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const Navbar = () => {
  // search

  const {products, getProducts} = useContext(productsContext);
  const {addProductToCart} = useContext(cartContext);
  useEffect(()=>{
      getProducts()
  }, [])

  // pagination 
  const { productsTotalCount } = useContext(productsContext);

  const [searchParams, setSearchParams] = useSearchParams(); 
  const [search, setSearch] = useState(
      searchParams.get("q") ? searchParams.get("q") : ""
    );
  const [page, setPage] = useState(searchParams.get("_page") ? searchParams.get("_page") : 1);
  const [limit, setLimit] = useState(searchParams.get("_limit") ? searchParams.get("_limit") : 8);
   
  useEffect(() => {
      setSearchParams({
          q: search,
        _page: page,
        _limit: limit,
      });
    }, []);

  useEffect(() => {
      getProducts();
    }, [searchParams]);

  useEffect(() => {
      setSearchParams({
          q: search,
        _page: page,
        _limit: limit,
      });
    }, [search, page, limit]);
  // end pagination 



  // end search
    const [anchorEl, setAnchorEl] = React.useState(null);

    const location = useLocation();
    const {
      handleLogout,
      user: { email },
    } = useAuth();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const { getCart, cartLength} = useContext(cartContext);
    
    useEffect(()=>{
      getCart()
    },[])
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
         {email === "tynaliev13th@gmail.com" || email === "b.ilyazov@gmail.com" ? (
           location.pathname === '/admin' ? <Link
           to='/'
           style={{color: "black", textDecoration: "none"}}
         ><MenuItem onClick={handleMenuClose}>Home</MenuItem></Link> :
          <Link
            to='/admin'
            style={{color: "black", textDecoration: "none"}}
          ><MenuItem onClick={handleMenuClose}>Admin</MenuItem></Link>
          ) : null}
        {email ? (
            <Link to="/" style={{color: "black", textDecoration: "none"}}><MenuItem onClick={handleLogout}>Logout</MenuItem></Link>
            ) : null}
            {email ? null : (
            <Link to="/auth" style={{color: "black", textDecoration: "none"}}>
              <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
            </Link>
          )}
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={cartLength} color="error">
                  <AddShoppingCartIcon />
                </Badge>
            </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new FavoriteBorderIcon"
            color="inherit"
          >
            <Badge badgeContent={12} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <p>Favorite</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar" position="fixed" box-shadow="none" top="0" left="0" right="0" height="8vh" background-color="rgba(0,0,0,0)">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            <Link style={{color: "white", textDecoration: "none"}} to="/">R I N N E G A N</Link>  
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                {email ? (
                  <Link to="/cart">
                    <Badge badgeContent={cartLength} color="error">
                      <AddShoppingCartIcon />
                    </Badge>
                  </Link>
                ) : (
                <Link to="/auth" >
                  <Badge badgeContent={cartLength} color="error">
                    <AddShoppingCartIcon />
                  </Badge>
                </Link>
                )}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new FavoriteBorderIcon"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
};

export default Navbar;