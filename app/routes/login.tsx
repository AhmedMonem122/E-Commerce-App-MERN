import LoginPage from "src/pages/Login/Login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Login" },
    {
      name: "description",
      content:
        "Sign in to your Trust Cart account to access personalized shopping, track orders, manage your wishlist, and enjoy a seamless shopping experience. Safe and secure login.",
    },
  ];
}

const Login = () => {
  return <LoginPage />;
};

export default Login;
