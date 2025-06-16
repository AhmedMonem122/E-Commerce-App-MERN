import { Box, Container, Typography, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UserInfo from "./UserInfo";
import UpdateProfileForm from "./UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";
import useAuth from "src/hooks/use-auth";

const ProfilePage = () => {
  const { data } = useAuth();

  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ py: 4, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            My Profile
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            href={`/${data?.data?.user?.role}/dashboard/overview`}
            sx={{
              borderRadius: "20px",
              px: 3,
              py: 1,
              textTransform: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Go to Dashboard
          </Button>
        </Box>

        <UserInfo />

        <Box sx={{ mb: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTabs-scrollButtons": {
                display: { xs: "flex", md: "none" },
              },
            }}
          >
            <Tab label="Profile Information" />
            <Tab label="Change Password" />
            <Tab label="Delete Account" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <UpdateProfileForm />}
          {tab === 1 && <ChangePasswordForm />}
          {tab === 2 && <DeleteAccount />}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
