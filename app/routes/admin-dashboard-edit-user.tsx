import AddEditUser from "src/pages/Dashboard/AdminDashboard/AddEditUser/AddEditUser";
import type { Route } from "./+types/admin-dashboard-edit-user";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Edit User" },
    {
      name: "description",
      content:
        "Admin users management dashboard for Trust Cart. Manage your users catalog, inventory levels, pricing, and categories. Add new users, update existing listings, and track user performance metrics.",
    },
  ];
}
const AdminDashboardEditUser = () => {
  return <AddEditUser />;
};

export default AdminDashboardEditUser;
