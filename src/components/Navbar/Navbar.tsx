import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
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

const pages = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Products", icon: <InventoryIcon /> },
  { name: "Categories", icon: <CategoryIcon /> },
  { name: "About", icon: <InfoIcon /> },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const settings = ["Profile", "Orders", "Wishlist", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <Box
              component="img"
              src={trustCartLogo}
              alt="TrustCart"
              sx={{ height: 40 }}
            />
          </Box>

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
              <Box
                component="img"
                src={trustCartLogo}
                alt="TrustCart"
                sx={{ height: 35, ml: 2, mb: 2 }}
              />
              <List>
                {pages.map((page) => (
                  <ListItem
                    component="button"
                    key={page.name}
                    onClick={toggleSidebar}
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      background: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f0f7ff",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                          color: "#3B82F6",
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
            <Box
              component="img"
              src={trustCartLogo}
              alt="TrustCart"
              sx={{ height: 35 }}
            />
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  color: "#1A202C",
                  display: "block",
                  "&:hover": { color: "#3B82F6" },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Cart and User menu remain unchanged */}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
