import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Form } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

const UpdateProfileForm = () => (
  <Paper sx={{ p: 3 }} component={Form} method="patch">
    <Typography variant="h6" sx={{ mb: 3 }}>
      Update Profile Information
    </Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          defaultValue="John"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          defaultValue="Doe"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          defaultValue="john@example.com"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          defaultValue="+1234567890"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

export default UpdateProfileForm;
