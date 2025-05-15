import BrandsPage from "src/pages/Brands/Brands";
import type { Route } from "./+types/brands";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Brands" },
    {
      name: "description",
      content:
        "Explore our curated collection of trusted brands at Trust Cart. Discover premium products from top manufacturers, exclusive brand deals, and authentic merchandise all in one place.",
    },
  ];
}
const Brands = () => {
  return <BrandsPage />;
};

export default Brands;
