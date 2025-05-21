import { useQuery } from "@tanstack/react-query";
import { useState, createContext, type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "src/api/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  data: any;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/users/me");
      return response.data;
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext
      value={{
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
        data,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
