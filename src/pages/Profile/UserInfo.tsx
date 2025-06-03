import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import useAuth from "src/hooks/use-auth";

const UserInfo = () => {
  const { data } = useAuth();

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Avatar
          sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
          src={data?.data?.user?.photo}
        >
          {data?.data?.user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5">{data?.data?.user?.name}</Typography>
          <Typography color="text.secondary">
            {data?.data?.user?.email}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Member since: January 2024
          </Typography> */}
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserInfo;
