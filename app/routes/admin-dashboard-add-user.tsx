import AddEditUser from "src/pages/Dashboard/AdminDashboard/AddEditUser/AddEditUser";
import type { Route } from "./+types/admin-dashboard-add-user";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Add User" },
    {
      name: "description",
      content:
        "Admin users management dashboard for Trust Cart. Manage your users catalog, inventory levels, pricing, and categories. Add new users, update existing listings, and track user performance metrics.",
    },
  ];
}
const AdminDashboardAddUser = () => {
  return <AddEditUser />;
};

export default AdminDashboardAddUser;
