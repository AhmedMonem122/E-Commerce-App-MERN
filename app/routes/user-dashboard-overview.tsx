import Overview from "src/pages/Dashboard/ReusablePages/Overview/Overview";
import type { Route } from "./+types/user-dashboard-overview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | User Dashboard | Overview" },
    {
      name: "description",
      content:
        "Your personalized shopping dashboard on Trust Cart. Track your recent orders, view recommended products, and manage your account preferences. Get insights into your shopping habits and discover new deals.",
    },
  ];
}
const UserDashboardOverview = () => {
  return <Overview />;
};

export default UserDashboardOverview;
