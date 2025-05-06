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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginIllustration from "../../assets/images/svgs/login-illustration.svg";
import axios from "../../api/axios";
import useAuth from "src/hooks/use-auth";

type LoginState = {
  email: string;
  emailError: string | null;
  password: string;
  passwordError: string | null;
};

const LoginPage = () => {
  const { setIsAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const navigate = useNavigate();

  const initialState: LoginState = {
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  };

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return axios.post("/users/signin", data);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      setIsAuthenticated(true);
      setSnackbar({
        open: true,
        message: "Successfully logged in! Welcome back!",
        severity: "success",
      });
      navigate("/");
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message || "Login failed. Please try again.",
        severity: "error",
      });
    },
  });

  const loginAction = async (prevState: LoginState, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let errors = { ...prevState };

    // Email validation
    if (!email) {
      errors.emailError = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.emailError = "Invalid email address";
    } else {
      errors.emailError = null;
    }

    // Password validation
    if (!password) {
      errors.passwordError = "Password is required";
    } else if (password.length < 8) {
      errors.passwordError = "Password must be at least 8 characters";
    } else {
      errors.passwordError = null;
    }

    // If there are validation errors, return the updated state
    if (errors.emailError || errors.passwordError) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "warning",
      });
      return errors;
    }

    try {
      loginMutation.mutate({ email, password });

      if (loginMutation.data?.data?.token) {
        localStorage.setItem("token", loginMutation.data?.data?.token);
        return { ...prevState, emailError: null, passwordError: null };
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Login failed",
        severity: "error",
      });
      return {
        ...prevState,
        emailError: "Invalid credentials",
        passwordError: "Invalid credentials",
      };
    }
  };

  const [state, formAction] = useActionState<LoginState, FormData>(
    (prevState: LoginState, formData: FormData): Promise<LoginState> => {
      return loginAction(prevState, formData) as Promise<LoginState>;
    },
    initialState
  );

  // Add handleClose function
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
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
                src={loginIllustration}
                alt="Login"
                sx={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>

            {/* Right side - Login Form */}
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
                  Welcome Back!
                </Typography>
                <Typography
                  sx={{ mb: 4, color: "#64748B", textAlign: "center" }}
                >
                  Please sign in to your account
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
                    error={state?.emailError ? !!state.emailError : false}
                    helperText={state?.emailError && state.emailError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#64748B" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={state?.passwordError ? !!state.passwordError : false}
                    helperText={state?.passwordError && state.passwordError}
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

                  <Box
                    sx={{
                      mt: 1,
                      mb: 3,
                      textAlign: "right",
                    }}
                  >
                    <Link
                      component={RouterLink}
                      to="/forgot-password"
                      sx={{
                        color: "#3B82F6",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loginMutation.isPending}
                    sx={{
                      mt: 1,
                      mb: 3,
                      py: 1.5,
                      backgroundColor: "#3B82F6",
                      "&:hover": { backgroundColor: "#2563EB" },
                    }}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>

                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#64748B",
                    }}
                  >
                    Don't have an account?{" "}
                    <Link
                      component={RouterLink}
                      to="/register"
                      sx={{
                        color: "#3B82F6",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

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
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
            "& .MuiAlert-message": {
              fontSize: "1rem",
              fontWeight: 500,
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
