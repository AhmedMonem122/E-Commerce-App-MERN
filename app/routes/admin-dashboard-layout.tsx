import DashboardLayout from "src/reusableComponents/DashboardLayout/DashboardLayout";
import type { Route } from "./+types/admin-dashboard-layout";

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
  return <DashboardLayout isAdmin />;
};

export default AdminDashboardLayout;
