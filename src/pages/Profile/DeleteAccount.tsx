import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { Form } from "react-router";

const DeleteAccount = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Paper sx={{ p: 3, bgcolor: "error.light" }}>
      <Typography variant="h6" sx={{ color: "error.dark", mb: 2 }}>
        Delete Account
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "error.dark" }}>
        Warning: This action cannot be undone. All your data will be permanently
        deleted.
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={() => setDeleteDialogOpen(true)}
      >
        Delete My Account
      </Button>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            component={Form}
            method="delete"
          >
            Yes, Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DeleteAccount;
