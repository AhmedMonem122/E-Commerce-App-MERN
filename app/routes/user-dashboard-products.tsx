import DashboardProducts from "src/pages/Dashboard/ReusablePages/Products/DashboardProducts";
import type { Route } from "./+types/user-dashboard-products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | User Dashboard | Products" },
    {
      name: "description",
      content:
        "Browse and discover products on Trust Cart. View personalized recommendations, check product availability, and explore special offers. Your gateway to finding the perfect items for your needs.",
    },
    {
      name: "description",
      content:
        "Admin products management dashboard for Trust Cart. Manage your product catalog, inventory levels, pricing, and categories. Add new products, update existing listings, and track product performance metrics.",
    },
  ];
}
const UserDashboardProducts = () => {
  return <DashboardProducts />;
};

export default UserDashboardProducts;
