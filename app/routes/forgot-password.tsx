import ForgotPasswordPage from "src/pages/ForgotPassword/ForgotPassword";
import type { Route } from "./+types/forgot-password";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Forgot Password" },
    {
      name: "description",
      content:
        "Reset your Trust Cart password securely. We'll help you regain access to your account by sending a password reset link to your registered email address.",
    },
  ];
}
const ForgotPassword = () => {
  return <ForgotPasswordPage />;
};

export default ForgotPassword;
