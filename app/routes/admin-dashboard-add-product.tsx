import AddEditProduct from "src/pages/Dashboard/AdminDashboard/AddEditProduct/AddEditProduct";
import type { Route } from "./+types/admin-dashboard-add-product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Add Product" },
    {
      name: "description",
      content:
        "Admin products management dashboard for Trust Cart. Manage your product catalog, inventory levels, pricing, and categories. Add new products, update existing listings, and track product performance metrics.",
    },
  ];
}
const AdminDashboardAddProduct = () => {
  return <AddEditProduct mode="add" />;
};

export default AdminDashboardAddProduct;
