import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import resetPasswordIllustration from "../../assets/images/svgs/reset-password-illustration.svg";
import axios from "../../api/axios";

type ResetPasswordState = {
  token: string;
  tokenError?: string | null;
  password: string;
  passwordError?: string | null;
  passwordConfirm: string;
  passwordConfirmError?: string | null;
};

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const initialState: ResetPasswordState = {
    token: "",
    tokenError: null,
    password: "",
    passwordError: null,
    passwordConfirm: "",
    passwordConfirmError: null,
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const resetPasswordMutation = useMutation({
    mutationFn: async (
      data: Omit<
        ResetPasswordState,
        "tokenError" | "passwordError" | "passwordConfirmError"
      >
    ) => {
      return axios.post(`/users/resetPassword/${data.token}`, data);
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message:
          "Password reset successful! Please login with your new password.",
        severity: "success",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Password reset failed",
        severity: "error",
      });
    },
  });

  const resetPasswordAction = async (
    prevState: ResetPasswordState,
    formData: FormData
  ) => {
    const data = {
      token: formData.get("token") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("passwordConfirm") as string,
    };

    let errors = { ...prevState, ...data };

    if (!data.token) {
      errors.tokenError = "Reset token is required";
    } else {
      errors.tokenError = null;
    }

    if (!data.password) {
      errors.passwordError = "Password is required";
    } else if (data.password.length < 8) {
      errors.passwordError = "Password must be at least 8 characters";
    } else {
      errors.passwordError = null;
    }

    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirmError = "Passwords do not match";
    } else {
      errors.passwordConfirmError = null;
    }

    if (
      errors.tokenError ||
      errors.passwordError ||
      errors.passwordConfirmError
    ) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "warning",
      });
      return errors;
    }

    try {
      resetPasswordMutation.mutate({
        token: data.token,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      return {
        ...prevState,
        ...data,
        tokenError: null,
        passwordError: null,
        passwordConfirmError: null,
      };
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Request failed",
        severity: "error",
      });
      return errors;
    }
  };

  const [state, formAction] = useActionState(resetPasswordAction, initialState);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        py: 8,
        backgroundColor: "#F8FAFC",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left side - Illustration */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={resetPasswordIllustration}
              alt="Reset Password"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          {/* Right side - Form */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 6 },
                borderRadius: 2,
                backgroundColor: "white",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  color: "#1A202C",
                  textAlign: "center",
                }}
              >
                Reset Password
              </Typography>
              <Typography sx={{ mb: 4, color: "#64748B", textAlign: "center" }}>
                Enter your new password below
              </Typography>

              <Box component="form" action={formAction} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="token"
                  label="Reset Token"
                  name="token"
                  error={!!state.tokenError}
                  helperText={state.tokenError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  error={!!state.passwordError}
                  helperText={state.passwordError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm New Password"
                  type={showPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  error={!!state.passwordConfirmError}
                  helperText={state.passwordConfirmError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={resetPasswordMutation.isPending}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    backgroundColor: "#3B82F6",
                    "&:hover": { backgroundColor: "#2563EB" },
                  }}
                >
                  {resetPasswordMutation.isPending
                    ? "Resetting Password..."
                    : "Reset Password"}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPasswordPage;
