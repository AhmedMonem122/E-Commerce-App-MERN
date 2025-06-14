import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:id", "routes/product-details.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("reset-password", "routes/reset-password.tsx"),
  route("about", "routes/about-us.tsx"),
  route("brands", "routes/brands.tsx"),
  route("categories", "routes/categories.tsx"),
  route("categories/:id", "routes/category-products.tsx"),
  route("brands/:id", "routes/brand-products.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
