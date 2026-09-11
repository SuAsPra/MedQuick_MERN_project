import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme, Box, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is768 = useMediaQuery(theme.breakpoints.down(768));

  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", borderBottom: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", color: "text.primary" }}>
      <Toolbar sx={{ px: is480 ? 1 : 3, height: "4.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand Logo */}
        <Stack
          component={Link}
          to={loggedInUser?.isAdmin ? "/admin/dashboard" : "/"}
          flexDirection="row"
          alignItems="center"
          columnGap={1}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Box sx={{ bgcolor: "#0f766e", color: "white", p: 0.8, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LocalHospitalIcon sx={{ fontSize: 24 }} />
          </Box>
          <Stack>
            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.5px", color: "#0f766e", lineHeight: 1.1 }}>
              MedQuick
            </Typography>
            {!is480 && (
              <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
                24/7 ESSENTIALS
              </Typography>
            )}
          </Stack>
        </Stack>

        {/* Right side navigation & user actions */}
        <Stack flexDirection={'row'} alignItems={'center'} columnGap={is480 ? 1 : 2}>
          
          {/* Admin Navigation Quick Links on wider screens */}
          {loggedInUser?.isAdmin && !is768 && (
            <Stack flexDirection="row" columnGap={1} mr={1}>
              <Button size="small" component={Link} to="/admin/dashboard" sx={{ color: "text.primary", fontWeight: 600 }}>
                Products
              </Button>
              <Button size="small" component={Link} to="/admin/orders" sx={{ color: "text.primary", fontWeight: 600 }}>
                Orders
              </Button>
              <Button size="small" component={Link} to="/admin/prescriptions" startIcon={<AssignmentTurnedInOutlinedIcon />} sx={{ color: "#d97706", fontWeight: 600 }}>
                Prescriptions
              </Button>
              <Button size="small" component={Link} to="/admin/customers" startIcon={<PeopleAltOutlinedIcon />} sx={{ color: "#0284c7", fontWeight: 600 }}>
                Customers
              </Button>
            </Stack>
          )}

          {/* User Welcome */}
          {!is480 && (
            <Typography variant='body2' fontWeight={500} color="text.secondary">
              {userInfo?.name ? `Hi, ${userInfo.name.split(" ")[0]}` : 'Welcome'}
            </Typography>
          )}

          {/* Admin Chip */}
          {loggedInUser?.isAdmin && (
            <Chip label="Admin" size="small" color="primary" sx={{ fontWeight: 700 }} />
          )}

          {/* Customer Cart */}
          {!loggedInUser?.isAdmin && (
            <Badge badgeContent={cartItems?.length || 0} color='error'>
              <IconButton onClick={() => navigate("/cart")} sx={{ color: "text.primary" }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
          )}

          {/* Customer Wishlist */}
          {!loggedInUser?.isAdmin && (
            <Badge badgeContent={wishlistItems?.length || 0} color='error'>
              <IconButton component={Link} to={"/wishlist"} sx={{ color: "text.primary" }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Badge>
          )}

          {/* Filter toggle button on product list */}
          {isProductList && (
            <Tooltip title="Filter categories & brands">
              <IconButton onClick={handleToggleFilters} sx={{ color: isProductFilterOpen ? "#0f766e" : "inherit" }}>
                <TuneIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* User Avatar Menu */}
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
              <Avatar sx={{ bgcolor: "#0f766e", width: 34, height: 34, fontSize: "0.9rem" }}>
                {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser?.isAdmin ? (
              [
                <MenuItem key="dash" component={Link} to="/admin/dashboard" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Dashboard & Products</Typography>
                </MenuItem>,
                <MenuItem key="add-prod" component={Link} to="/admin/add-product" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Add New Product</Typography>
                </MenuItem>,
                <MenuItem key="orders" component={Link} to="/admin/orders" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Manage Orders</Typography>
                </MenuItem>,
                <MenuItem key="presc" component={Link} to="/admin/prescriptions" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Verify Prescriptions</Typography>
                </MenuItem>,
                <MenuItem key="cust" component={Link} to="/admin/customers" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Customer Directory</Typography>
                </MenuItem>,
                <Divider key="div" />,
                <MenuItem key="profile" component={Link} to="/admin/profile" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Profile</Typography>
                </MenuItem>,
                <MenuItem key="logout" component={Link} to="/logout" onClick={handleCloseUserMenu}>
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              ]
            ) : (
              [
                <MenuItem key="home" component={Link} to="/" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Browse Products</Typography>
                </MenuItem>,
                <MenuItem key="orders" component={Link} to="/orders" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">My Orders</Typography>
                </MenuItem>,
                <MenuItem key="wishlist" component={Link} to="/wishlist" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">My Wishlist</Typography>
                </MenuItem>,
                <MenuItem key="profile" component={Link} to="/profile" onClick={handleCloseUserMenu}>
                  <Typography color="text.primary">Profile & Addresses</Typography>
                </MenuItem>,
                <Divider key="div" />,
                <MenuItem key="logout" component={Link} to="/logout" onClick={handleCloseUserMenu}>
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              ]
            )}
          </Menu>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};