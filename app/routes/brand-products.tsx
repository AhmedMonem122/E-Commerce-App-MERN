import axios from "src/api/axios";
import type { Route } from "./+types/brand-products";
import type { AxiosError } from "axios";
import CategoryBrandProductsPage from "src/pages/CategoryBrandProducts/CategoryBrandProducts";
import CategoryBrandProductsSkeleton from "src/pages/CategoryBrandProducts/CategoryBrandProductsSkeleton";

export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: `Trust Cart | ${
        data?.data?.data?.products[0]?.brand?.title || "Brand Products"
      }`,
    },
    {
      name: "description",
      content: `Browse our collection of products in ${
        data?.data?.data?.products[0]?.brand?.title || "this brand"
      }`,
    },
  ];
}

export async function clientLoader({
  params: { id },
  request,
}: Route.LoaderArgs) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Get filter parameters
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";
    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "1000";
    const minRating = searchParams.get("rating") || "0";
    const page = searchParams.get("page") || "1";

    // Build query string
    const queryString = new URLSearchParams({
      search,
      sort: sortBy,
      "price[gte]": minPrice,
      "price[lte]": maxPrice,
      "ratingsAverage[gte]": minRating,
      page,
    }).toString();

    const response = await axios.get(`/brands/${id}/products?${queryString}`);

    return {
      id,
      data: response.data,
    };
  } catch (error) {
    return {
      id,
      data: null,
      error: error as AxiosError,
    };
  }
}

export function HydrateFallback() {
  return <CategoryBrandProductsSkeleton />;
}

const BrandProducts = ({ loaderData }: Route.ComponentProps) => {
  return <CategoryBrandProductsPage {...loaderData} />;
};

export default BrandProducts;
