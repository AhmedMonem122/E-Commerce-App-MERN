import { Navigate } from "react-router";
import useAuth from "../../hooks/use-auth";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) => {
  const { isAuthenticated, data, isLoading } = useAuth();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    setIsInitialLoading(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (typeof window === "undefined") {
    return null;
  }

  if (!isAuthenticated && !data && !isLoading && !isInitialLoading) {
    return <Navigate to="/login" replace />;
  }

  if (
    roles.length > 0 &&
    !roles.includes(data?.data?.user?.role) &&
    !isLoading &&
    !isInitialLoading
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
