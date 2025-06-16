import type { Route } from "./+types/admin-dashboard-overview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Admin Dashboard" },
    {
      name: "description",
      content:
        "Admin dashboard overview with real-time analytics for Trust Cart. View interactive sales charts, product performance metrics, customer insights, and inventory trends. Manage your e-commerce operations with comprehensive data visualization.",
    },
  ];
}
const AdminDashboardOverview = () => {
  return <div>AdminDashboardOverview</div>;
};

export default AdminDashboardOverview;
