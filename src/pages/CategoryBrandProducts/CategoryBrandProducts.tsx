import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Pagination,
  Stack,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import type { Product } from "src/types/products.type";
import { Link, useLocation, useSearchParams } from "react-router";
import FilterSection from "./FilterSection";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

const CategoryBrandProductsPage = ({
  id,
  data,
}: {
  id: string;
  data: {
    data: {
      products: Product[];
    };
    metadata: {
      numberOfPages: number;
    };
  } | null;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const page = searchParams.get("page") || "1";

  const products = data?.data?.products || [];
  const totalPages = data?.metadata?.numberOfPages || 0;

  const { pathname } = useLocation();

  const categoryBrandData = useQuery({
    queryKey: [pathname.startsWith("/categories") ? "category" : "brand"],
    queryFn: async () => {
      const response = await axios.get(pathname);
      return await response.data;
    },
  });

  return (
    <Box sx={{ py: 4, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {categoryBrandData?.data?.data?.category?.title ||
              categoryBrandData?.data?.data?.brand?.title ||
              "Products"}
          </Typography>
          {isMobile && (
            <Button
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
            >
              Filters
            </Button>
          )}
        </Stack>

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3 }}>
              <FilterSection />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid
                  component={Link}
                  to={`/products/${product?._id}`}
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={product._id}
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageCover}
                      alt={product.title}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap>
                        {product.title}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Rating
                          value={product.ratingsAverage}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({product.ratingsQuantity})
                        </Typography>
                      </Stack>
                      <Typography variant="h6" color="primary" fontWeight={600}>
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {products.length === 0 && (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  No products found matching your criteria
                </Typography>
              </Box>
            )}

            {totalPages > 1 && products.length && (
              <Stack alignItems="center" sx={{ mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={Number(page)}
                  onChange={(_, value) => {
                    searchParams.set("page", value.toString());
                    setSearchParams(searchParams);
                  }}
                  color="primary"
                />
              </Stack>
            )}
          </Grid>
        </Grid>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiPaper-root": {
              p: 2,
            },
          }}
        >
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <FilterSection />
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default CategoryBrandProductsPage;
