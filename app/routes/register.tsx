import RegisterPage from "src/pages/Register/Register";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Register" },
    {
      name: "description",
      content:
        "Create your Trust Cart account today and join our trusted shopping community. Enjoy personalized recommendations, exclusive deals, order tracking, and a secure shopping experience.",
    },
  ];
}
const Register = () => {
  return <RegisterPage />;
};

export default Register;
