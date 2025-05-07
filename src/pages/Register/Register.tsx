import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { useActionState, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import registerIllustration from "../../assets/images/svgs/register-illustration.svg";
import axios from "../../api/axios";

type RegisterState = {
  name: string;
  nameError?: string | null;
  email: string;
  emailError?: string | null;
  password: string;
  passwordError?: string | null;
  passwordConfirm: string;
  passwordConfirmError?: string | null;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // First, update the state initialization
  const initialState: RegisterState = {
    name: "",
    nameError: null,
    email: "",
    emailError: null,
    password: "",
    passwordError: null,
    passwordConfirm: "",
    passwordConfirmError: null,
  };

  const registerMutation = useMutation({
    mutationFn: async (
      data: Omit<
        RegisterState,
        "nameError" | "emailError" | "passwordError" | "passwordConfirmError"
      >
    ) => {
      return axios.post("/users/signup", {
        ...data,
        url: `${window.location.origin}/profile`,
      });
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Registration successful! Please login.",
        severity: "success",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Registration failed",
        severity: "error",
      });
    },
  });

  const registerAction = async (
    prevState: RegisterState,
    formData: FormData
  ) => {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("passwordConfirm") as string,
    };

    let errors = { ...prevState };

    // Name validation
    if (!data.name) {
      errors.nameError = "Name is required";
    } else {
      errors.nameError = null;
    }

    // Email validation
    if (!data.email) {
      errors.emailError = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      errors.emailError = "Invalid email address";
    } else {
      errors.emailError = null;
    }

    // Password validation
    if (!data.password) {
      errors.passwordError = "Password is required";
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
      errors.nameError ||
      errors.emailError ||
      errors.passwordError ||
      errors.passwordConfirmError
    ) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "warning",
      });
      return { ...errors, ...data };
    }

    try {
      registerMutation.mutate({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      return {
        ...prevState,
        ...data,
        nameError: null,
        emailError: null,
        passwordError: null,
        passwordConfirmError: null,
      };
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Registration failed",
        severity: "error",
      });
      return { ...errors, ...data };
    }
  };

  const [state, formAction] = useActionState(registerAction, initialState);

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
              src={registerIllustration}
              alt="Register"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          {/* Right side - Register Form */}
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
                Create an Account
              </Typography>
              <Typography sx={{ mb: 4, color: "#64748B", textAlign: "center" }}>
                Join us! Please enter your details
              </Typography>

              <Box component="form" action={formAction} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={!!state.nameError}
                  helperText={state.nameError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={!!state.emailError}
                  helperText={state.emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
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
                  error={!!state.passwordError}
                  helperText={state.passwordError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type={showPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  autoComplete="new-password"
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
                  error={!!state.passwordConfirmError}
                  helperText={state.passwordConfirmError}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={registerMutation.isPending}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    backgroundColor: "#3B82F6",
                    "&:hover": { backgroundColor: "#2563EB" },
                  }}
                >
                  {registerMutation.isPending
                    ? "Creating Account..."
                    : "Sign Up"}
                </Button>

                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#64748B",
                  }}
                >
                  Already have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: "#3B82F6",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in
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
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
