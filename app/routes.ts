import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
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
  ]),
  layout("routes/admin-dashboard-layout.tsx", [
    route("admin/dashboard/overview", "routes/admin-dashboard-overview.tsx"),
    route("admin/dashboard/products", "routes/admin-dashboard-products.tsx"),
    route(
      "admin/dashboard/products/add",
      "routes/admin-dashboard-add-product.tsx"
    ),
    route(
      "admin/dashboard/products/edit/:id",
      "routes/admin-dashboard-edit-product.tsx"
    ),
    route("admin/dashboard/users", "routes/admin-dashboard-users.tsx"),
    route("admin/dashboard/users/add", "routes/admin-dashboard-add-user.tsx"),
    route(
      "admin/dashboard/users/edit/:id",
      "routes/admin-dashboard-edit-user.tsx"
    ),
  ]),
  layout("routes/user-dashboard-layout.tsx", [
    route("user/dashboard/overview", "routes/user-dashboard-overview.tsx"),
    route("user/dashboard/products", "routes/user-dashboard-products.tsx"),
  ]),
] satisfies RouteConfig;
