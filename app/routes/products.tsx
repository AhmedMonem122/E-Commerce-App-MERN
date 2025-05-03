import type { Route } from "./+types/products";


export function meta({}: Route.MetaArgs) {
    return [
      { title: "Trust Cart | Products" },
      {
        name: "description",
        content:
          "Browse our extensive collection of high-quality products. Filter by category, sort by price or ratings, and discover amazing deals. Find exactly what you're looking for with our advanced search features.",
      },
    ];
  }
const Products = () => {
  return (
    <div>Products</div>
  )
}

export default Products