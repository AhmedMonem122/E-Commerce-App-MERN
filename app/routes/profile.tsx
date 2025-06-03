import ProfilePage from "src/pages/Profile/Profile";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | My Profile" },
    {
      name: "description",
      content:
        "Manage your Trust Cart profile, view your orders, update your personal information, and customize your shopping preferences.",
    },
  ];
}
const Profile = () => {
  return <ProfilePage />;
};

export default Profile;
