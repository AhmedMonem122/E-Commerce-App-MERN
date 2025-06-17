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
import { NavLink, Outlet, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CategoryIcon from "@mui/icons-material/Category";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalMallIcon from "@mui/icons-material/LocalMall";

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
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Overview",
      icon: <AssessmentIcon />,
      path: `${
        isAdmin ? "/admin/dashboard/overview" : "/user/dashboard/overview"
      }`,
    },
    {
      text: "Products",
      icon: <ShoppingCartIcon />,
      path: `${
        isAdmin ? "/admin/dashboard/products" : "/user/dashboard/products"
      }`,
    },
    ...(isAdmin
      ? [
          {
            text: "Users",
            icon: <PeopleIcon />,
            path: "/admin/dashboard/users",
          },
          {
            text: "Brands",
            icon: <LocalMallIcon />,
            path: "/admin/dashboard/brands",
          },
          {
            text: "Categories",
            icon: <CategoryIcon />,
            path: "/admin/dashboard/categories",
          },
          {
            text: "Reviews",
            icon: <RateReviewIcon />,
            path: "/admin/dashboard/reviews",
          },
          {
            text: "Payments",
            icon: <PaymentIcon />,
            path: "/admin/dashboard/payments",
          },
        ]
      : [
          {
            text: "Brands",
            icon: <LocalMallIcon />,
            path: "/user/dashboard/brands",
          },
          {
            text: "Categories",
            icon: <CategoryIcon />,
            path: "/user/dashboard/categories",
          },
          {
            text: "Reviews",
            icon: <RateReviewIcon />,
            path: "/user/dashboard/reviews",
          },
          {
            text: "Orders",
            icon: <ShoppingCartIcon />,
            path: "/user/dashboard/orders",
          },
        ]),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 9999999999,
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
            zIndex: 999999,
          },
          position: "fixed",
          height: "100%",
          zIndex: 999999,
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
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: "0 20px 20px 0",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(63, 81, 181, 0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(63, 81, 181, 0.15)",
                    },
                    "&.active": {
                      backgroundColor: "rgba(63, 81, 181, 0.15)",
                    },
                    "&.active .MuiTypography-root": {
                      fontWeight: "bold",
                      color: "primary.main",
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
