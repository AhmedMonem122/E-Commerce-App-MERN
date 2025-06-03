import { Box, Container, Typography, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import UserInfo from "./UserInfo";
import UpdateProfileForm from "./UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";

const ProfilePage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ py: 4, bgcolor: "grey.50", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4 }}>
          My Profile
        </Typography>

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
