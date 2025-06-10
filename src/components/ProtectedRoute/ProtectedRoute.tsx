import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/use-auth";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) => {
  const { isAuthenticated, data } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && roles.includes(data?.data?.user?.role)) {
    return children;
  } else return !isCheckingAuth ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
