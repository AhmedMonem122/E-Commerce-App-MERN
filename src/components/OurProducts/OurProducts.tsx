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
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import axios from "src/api/axios";
import type { Product } from "src/types/products.type";

const OurProducts = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [search, setSearch] = useState("");

  const getProducts = () => {
    return axios.get(
      `/products?${
        search ? `search=${search}` : `page=${page}`
      }&sort=${sort}&limit=1`
    );
  };

  const query = useQuery({
    queryKey: ["products", page, sort, search],
    queryFn: getProducts,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
          Our Products
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
          Explore our wide range of quality products
        </Typography>

        {/* Filters */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 4 }}
          alignItems="center"
        >
          <TextField
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 200, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="-createdAt">Newest First</MenuItem>
              <MenuItem value="createdAt">Oldest First</MenuItem>
              <MenuItem value="-price">Price: High to Low</MenuItem>
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="-ratingsAverage">Best Rated</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Products Grid */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {query.data?.data?.data?.products.map((product: Product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
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
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageCover}
                  alt={product.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description.slice(0, 100)}...
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    <Rating
                      value={product.ratingsAverage}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </Stack>
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
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={query.data?.data?.metadata?.numberOfPages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1.1rem",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default OurProducts;
