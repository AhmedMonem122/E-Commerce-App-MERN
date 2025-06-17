import DashboardLayout from "src/reusableComponents/DashboardLayout/DashboardLayout";
import type { Route } from "./+types/user-dashboard-layout";
import ProtectedRoute from "src/components/ProtectedRoute/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | User Dashboard" },
    {
      name: "description",
      content:
        "User dashboard for Trust Cart e-commerce platform. View your orders, track purchases, manage wishlists, and update personal information. Your personalized shopping hub.",
    },
  ];
}
const UserDashboardLayout = () => {
  return (
    <ProtectedRoute roles={["user"]}>
      <DashboardLayout />
    </ProtectedRoute>
  );
};

export default UserDashboardLayout;
