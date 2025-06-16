import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, IconButton, Typography } from "@mui/material";

const drawerWidth = 240;

interface DashboardLayoutProps {
  isAdmin?: boolean;
}

const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Products", icon: <ShoppingCartIcon />, path: "/products" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    ...(isAdmin
      ? [{ text: "Settings", icon: <SettingsIcon />, path: "/settings" }]
      : []),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.5px",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {isAdmin ? "Admin Dashboard" : "My Dashboard"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={open ? "permanent" : "temporary"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#f8f9fa",
            borderRight: "none",
            boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            position: "fixed",
          },
          position: "fixed",
          height: "100%",
        }}
        open={open}
        onClose={toggleDrawer}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", height: "100%" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: "0 20px 20px 0",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(63, 81, 181, 0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(63, 81, 181, 0.15)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s ease",
          marginLeft: { xs: 0, md: open ? `${drawerWidth}px` : "0px" },
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
