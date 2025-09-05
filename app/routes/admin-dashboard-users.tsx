import DashboardUsers from "src/pages/Dashboard/AdminDashboard/Users/DashboardUsers";
import type { Route } from "./+types/admin-dashboard-users";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Users" },
    {
      name: "description",
      content:
        "Admin users management dashboard for Trust Cart. Manage your user accounts, permissions, and roles. Add new users, update existing profiles, and track user activity.",
    },
  ];
}
const AdminDashboardUsers = () => {
  return <DashboardUsers />;
};

export default AdminDashboardUsers;
