import CategoriesPage from "src/pages/Categories/Categories";
import type { Route } from "./+types/categories";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trust Cart | Categories" },
    {
      name: "description",
      content:
        "Discover our diverse range of product categories at Trust Cart. From electronics to fashion, home essentials to beauty products - find everything you need organized in easy-to-browse categories.",
    },
  ];
}
const Categories = () => {
  return <CategoriesPage />;
};

export default Categories;
