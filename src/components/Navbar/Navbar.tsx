import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
  Link as MUILink,
} from "@mui/material";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import trustCartLogo from "../../assets/images/svgs/trust-cart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "src/hooks/use-auth";

const pages = [
  { name: "Home", icon: <HomeIcon />, url: "/" },
  { name: "Products", icon: <InventoryIcon />, url: "/products" },
  { name: "Categories", icon: <CategoryIcon />, url: "/categories" },
  { name: "About", icon: <InfoIcon />, url: "/about" },
];

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleGoToSetting = (route: string) => {
    navigate(route);
    handleCloseUserMenu();
  };

  const settings = [
    { name: "Profile", onClick: () => handleGoToSetting("/profile") },
    { name: "Orders", onClick: () => handleGoToSetting("/allOrders") },
    { name: "Wishlist", onClick: () => handleGoToSetting("/wishlist") },
    { name: "Logout", onClick: handleLogout },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <MUILink
            component={Link}
            to="/"
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            <Box
              component="img"
              src={trustCartLogo}
              alt="TrustCart"
              sx={{ height: 40 }}
            />
          </MUILink>
          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={toggleSidebar}
              sx={{ color: "#1A202C" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* Sidebar for mobile */}
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#fff",
              },
            }}
          >
            <Box sx={{ pt: 2, pb: 2 }}>
              <MUILink component={Link} to="/">
                <Box
                  component="img"
                  src={trustCartLogo}
                  alt="TrustCart"
                  sx={{ height: 35, ml: 2, mb: 2 }}
                />
              </MUILink>
              <List>
                {pages.map((page) => (
                  <ListItem
                    component={NavLink}
                    to={page.url}
                    key={page.name}
                    onClick={toggleSidebar}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      background: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      borderRadius: "8px",
                      margin: "4px auto",
                      color: "#1A202C",
                      "&:hover": {
                        backgroundColor: "#f0f7ff",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                          color: "#3B82F6",
                        },
                      },
                      "&.active": {
                        backgroundColor: "#f0f7ff",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                          color: "#3B82F6",
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1A202C" }}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          {/* Logo for mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <MUILink component={Link} to="/">
              <Box
                component="img"
                src={trustCartLogo}
                alt="TrustCart"
                sx={{ height: 35 }}
              />
            </MUILink>
          </Box>
          {/* Desktop menu */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {pages.map((page) => (
              <MUILink
                component={NavLink}
                to={page.url}
                key={page.name}
                sx={{
                  color: "#1A202C",
                  display: "block",
                  textDecoration: "none",
                  position: "relative",
                  padding: "8px 12px",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#3B82F6",
                    "&::after": {
                      width: "100%",
                    },
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: "2px",
                    backgroundColor: "#3B82F6",
                    transition: "width 0.3s ease",
                  },
                  "&.active": {
                    color: "#3B82F6",
                    fontWeight: 600,
                    "&::after": {
                      width: "100%",
                    },
                  },
                }}
              >
                {page.name}
              </MUILink>
            ))}
          </Box>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
              <IconButton sx={{ color: "#1A202C" }}>
                <ShoppingCartIcon />
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#3B82F6" }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    component="button"
                    key={setting.name}
                    onClick={setting.onClick}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
              <MUILink
                component={NavLink}
                to="/login"
                sx={{
                  color: "#1A202C",
                  textDecoration: "none",
                  "&:hover": { color: "#3B82F6" },
                  "&.active": {
                    color: "#3B82F6",
                    fontWeight: 600,
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontWeight: "inherit",
                  }}
                >
                  Login
                </Typography>
              </MUILink>
              <MUILink
                component={NavLink}
                to="/register"
                sx={{
                  color: "#1A202C",
                  textDecoration: "none",
                  "&:hover": { color: "#3B82F6" },
                  "&.active": {
                    color: "#3B82F6",
                    fontWeight: 600,
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontWeight: "inherit",
                  }}
                >
                  Register
                </Typography>
              </MUILink>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
