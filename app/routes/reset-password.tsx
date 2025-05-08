import ResetPasswordPage from "src/pages/ResetPassword/ResetPassword";
import type { Route } from "./+types/reset-password";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Reset Your Password" },
    {
      name: "description",
      content:
        "Create a new password for your Trust Cart account. Enter your new password to securely update your credentials and regain access to your account.",
    },
  ];
}
const ResetPassword = () => {
  return <ResetPasswordPage />;
};

export default ResetPassword;
