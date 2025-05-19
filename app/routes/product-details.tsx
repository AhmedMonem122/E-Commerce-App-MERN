import axios from "src/api/axios";
import type { Route } from "./+types/product-details";
import ProductDetailsPage from "src/pages/ProductDetails/ProductDetails";
import type { AxiosError } from "axios";
import ProductDetailsSkeleton from "src/pages/ProductDetails/ProductDetailsSkeleton";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Trust Cart | ${data?.data?.data?.product?.title}` },
    {
      name: "description",
      content: data?.data?.data?.product?.description,
    },
  ];
}

export async function clientLoader({ params: { id } }: Route.LoaderArgs) {
  try {
    const response = await axios.get(`/products/${id}`);

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
  return <ProductDetailsSkeleton />;
}

const ProductDetails = ({ loaderData }: Route.ComponentProps) => {
  return <ProductDetailsPage {...loaderData} />;
};

export default ProductDetails;
