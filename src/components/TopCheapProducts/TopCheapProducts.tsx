import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Chip,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@tanstack/react-query";
import axios from "src/api/axios";
import type { TopCheapProduct } from "src/types/products.type";
import ProductSkeleton from "./ProductSkeleton";

const TopCheapProducts = () => {
  const getTopCheapProducts = () => {
    return axios.get("/products/top-5-cheap");
  };

  const query = useQuery({
    queryKey: ["topCheapProducts"],
    queryFn: getTopCheapProducts,
  });

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 1,
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            color: "#1A202C",
          }}
        >
          Best Deals for You
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "#64748B",
            fontWeight: "normal",
          }}
        >
          Discover our top 5 most affordable products with amazing quality
        </Typography>

        <Grid container spacing={4}>
          {query.isLoading
            ? // Show 5 skeleton cards while loading
              [...Array(5)].map((_, index) => <ProductSkeleton key={index} />)
            : // Show actual products when data is loaded
              query.data?.data?.data?.products.map(
                (product: TopCheapProduct) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
                    key={product.id}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.imageCover}
                          alt={product.title}
                          sx={{ objectFit: "cover" }}
                        />
                        {/* <Chip
                      label={`${product.discount}% OFF`}
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontWeight: "bold",
                      }}
                    /> */}
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                        >
                          {product.title}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 1 }}
                        >
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                          >
                            ${product.price}
                          </Typography>
                          {/* <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ${product.originalPrice}
                      </Typography> */}
                        </Stack>
                        <Rating
                          value={product.ratingsAverage}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          sx={{
                            backgroundColor: "#3B82F6",
                            "&:hover": {
                              backgroundColor: "#2563EB",
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopCheapProducts;
