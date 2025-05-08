import { AuthContext } from "./../context/AuthContextProvider";
import { use } from "react";

const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
