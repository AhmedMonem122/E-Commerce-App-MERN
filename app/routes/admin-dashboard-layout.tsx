import DashboardLayout from "src/reusableComponents/DashboardLayout/DashboardLayout";
import type { Route } from "./+types/admin-dashboard-layout";
import ProtectedRoute from "src/components/ProtectedRoute/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard" },
    {
      name: "description",
      content:
        "Admin dashboard for managing Trust Cart's e-commerce platform. Monitor sales, manage products, users, and orders. Access analytics and configure store settings.",
    },
  ];
}
const AdminDashboardLayout = () => {
  return (
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout isAdmin />
    </ProtectedRoute>
  );
};

export default AdminDashboardLayout;
