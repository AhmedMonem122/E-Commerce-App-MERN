import DashboardProducts from "src/pages/Dashboard/ReusablePages/Products/DashboardProducts";
import type { Route } from "./+types/admin-dashboard-products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Products" },
    {
      name: "description",
      content:
        "Admin products management dashboard for Trust Cart. Manage your product catalog, inventory levels, pricing, and categories. Add new products, update existing listings, and track product performance metrics.",
    },
  ];
}
const AdminDashboardProducts = () => {
  return <DashboardProducts isAdmin />;
};

export default AdminDashboardProducts;
