import AboutUsPage from "src/pages/AboutUs/AboutUs";
import type { Route } from "./+types/about-us";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Who are we?" },
    {
      name: "description",
      content:
        "Discover Trust Cart's story, our mission, and commitment to providing exceptional e-commerce experiences. Learn about our values, team, and dedication to customer satisfaction.",
    },
  ];
}

const AboutUs = () => {
  return <AboutUsPage />;
};

export default AboutUs;
