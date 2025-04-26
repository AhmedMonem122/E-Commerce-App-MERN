import HomePage from "src/pages/Home/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Home" },
    {
      name: "description",
      content:
        "Welcome to Your trusted destination for quality products and exceptional shopping experience. We prioritize trust, convenience, and customer satisfaction.",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
