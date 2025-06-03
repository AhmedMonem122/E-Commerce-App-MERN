import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useActionState } from "react";
import { useNavigate } from "react-router";
import useAuth from "src/hooks/use-auth";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type UpdatePasswordState = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

type ErrorState = {
  passwordCurrentError: string | null;
  passwordError: string | null;
  passwordConfirmError: string | null;
};

const ChangePasswordForm = () => {
  const { handleLogout } = useAuth();
  const { snackbar, setSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const updatePasswordMutation = useMutation({
    mutationFn: async (data: UpdatePasswordState) =>
      await axios.put("/users/updateMyPassword", data),
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Password updated successfully! Please login again.",
        severity: "success",
      });
      handleLogout();
      navigate("/login");
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to update password",
        severity: "error",
      });
    },
  });

  const initialState = {
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
    passwordCurrentError: null,
    passwordError: null,
    passwordConfirmError: null,
  };

  const updatePasswordAction = async (
    prevState: UpdatePasswordState & ErrorState,
    formData: FormData
  ) => {
    const data = {
      passwordCurrent: formData.get("passwordCurrent") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("passwordConfirm") as string,
    };

    let errors = { ...prevState };

    // Current Password validation
    if (!data.passwordCurrent) {
      errors.passwordCurrentError = "Current password is required";
    } else {
      errors.passwordCurrentError = null;
    }

    // New Password validation
    if (!data.password) {
      errors.passwordError = "New password is required";
    } else if (data.password.length < 8) {
      errors.passwordError = "Password must be at least 8 characters";
    } else {
      errors.passwordError = null;
    }

    // Password confirmation
    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirmError = "Passwords do not match";
    } else {
      errors.passwordConfirmError = null;
    }

    // Check for any errors
    if (
      errors.passwordCurrentError ||
      errors.passwordError ||
      errors.passwordConfirmError
    ) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "error",
      });
      return { ...errors, ...data };
    }

    try {
      updatePasswordMutation.mutate({
        passwordCurrent: data.passwordCurrent,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      return {
        ...prevState,
        ...data,
        passwordCurrentError: null,
        passwordError: null,
        passwordConfirmError: null,
      };
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error instanceof Error ? error.message : "Failed to update password",
        severity: "error",
      });
      return { ...errors, ...data };
    }
  };

  const [state, formAction] = useActionState(
    updatePasswordAction,
    initialState
  );

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleClickShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Paper sx={{ p: 3 }} component="form" action={formAction}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Change Password
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Current Password"
            name="passwordCurrent"
            type={showPasswords.current ? "text" : "password"}
            error={!!state.passwordCurrentError}
            helperText={state.passwordCurrentError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("current")}
                    edge="end"
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="New Password"
            name="password"
            type={showPasswords.new ? "text" : "password"}
            error={!!state.passwordError}
            helperText={state.passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("new")}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Confirm New Password"
            name="passwordConfirm"
            type={showPasswords.confirm ? "text" : "password"}
            error={!!state.passwordConfirmError}
            helperText={state.passwordConfirmError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirm")}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LockIcon />}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ChangePasswordForm;
