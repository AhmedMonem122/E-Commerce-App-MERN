import AddEditProduct from "src/pages/Dashboard/AdminDashboard/AddEditProduct/AddEditProduct";
import type { Route } from "./+types/admin-dashboard-edit-product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard | Edit Product" },
    {
      name: "description",
      content:
        "Update the product information below. You can modify any field to reflect the latest product details.",
    },
  ];
}

const AdminDashboardEditProduct = () => {
  return <AddEditProduct mode="edit" />;
};

export default AdminDashboardEditProduct;
