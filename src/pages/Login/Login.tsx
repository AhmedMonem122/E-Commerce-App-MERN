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
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginIllustration from "../../assets/images/svgs/login-illustration.svg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

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
              <Typography sx={{ mb: 4, color: "#64748B", textAlign: "center" }}>
                Please sign in to your account
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  sx={{
                    mt: 1,
                    mb: 3,
                    py: 1.5,
                    backgroundColor: "#3B82F6",
                    "&:hover": { backgroundColor: "#2563EB" },
                  }}
                >
                  Sign In
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
  );
};

export default LoginPage;
