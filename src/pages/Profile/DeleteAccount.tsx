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
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import { Alert, Snackbar } from "@mui/material";
import useAuth from "src/hooks/use-auth";
import { useNavigate } from "react-router";
import { useSnackbar } from "src/hooks/use-snackbar";

const DeleteAccount = () => {
  const { snackbar, setSnackbar, closeSnackbar } = useSnackbar();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      return await axios.delete("/users/deleteMe");
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Your account has been successfully deleted",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      // Wait for snackbar to be visible before logout
      setTimeout(() => {
        handleLogout();
        navigate("/");
      }, 2000);
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to delete account",
        severity: "error",
      });
      setDeleteDialogOpen(false);
    },
  });

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
            onClick={() => deleteAccountMutation.mutate()}
            disabled={deleteAccountMutation.isPending}
          >
            {deleteAccountMutation.isPending
              ? "Deleting..."
              : "Yes, Delete My Account"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DeleteAccount;
