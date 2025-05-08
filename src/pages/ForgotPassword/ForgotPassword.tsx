import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import { useActionState, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import EmailIcon from "@mui/icons-material/Email";
import forgotPasswordIllustration from "../../assets/images/svgs/forgot-password-illustration.svg";
import axios from "../../api/axios";

type ForgotPasswordState = {
  email: string;
  emailError?: string | null;
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const initialState: ForgotPasswordState = {
    email: "",
    emailError: null,
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return axios.post("/users/forgotPassword", {
        ...data,
        // url: `${window.location.origin}/reset-password`,
      });
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Reset link sent! Please check your email.",
        severity: "success",
      });
      navigate("/reset-password");
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to send reset link",
        severity: "error",
      });
    },
  });

  const forgotPasswordAction = async (
    prevState: ForgotPasswordState,
    formData: FormData
  ) => {
    const email = formData.get("email") as string;
    let errors = { ...prevState, email };

    if (!email) {
      errors.emailError = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.emailError = "Invalid email address";
    } else {
      errors.emailError = null;
    }

    if (errors.emailError) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "warning",
      });
      return errors;
    }

    try {
      forgotPasswordMutation.mutate({ email });
      return {
        ...prevState,
        email,
        emailError: null,
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

  const [state, formAction] = useActionState(
    forgotPasswordAction,
    initialState
  );

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
              src={forgotPasswordIllustration}
              alt="Forgot Password"
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
                Forgot Password?
              </Typography>
              <Typography sx={{ mb: 4, color: "#64748B", textAlign: "center" }}>
                Enter your email and we'll send you a link to reset your
                password
              </Typography>

              <Box component="form" action={formAction} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!state.emailError}
                  helperText={state.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={forgotPasswordMutation.isPending}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    backgroundColor: "#3B82F6",
                    "&:hover": { backgroundColor: "#2563EB" },
                  }}
                >
                  {forgotPasswordMutation.isPending
                    ? "Sending Reset Link..."
                    : "Send Reset Link"}
                </Button>

                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#64748B",
                  }}
                >
                  Remember your password?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: "#3B82F6",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Back to Login
                  </Link>
                </Typography>
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

export default ForgotPasswordPage;
