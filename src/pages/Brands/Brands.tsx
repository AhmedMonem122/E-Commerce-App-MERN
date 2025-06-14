import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { Link } from "react-router";

type Brand = {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  products: string[];
};

type Category = {
  _id: string;
  title: string;
};

const BrandsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title");

  const { data, isLoading } = useQuery({
    queryKey: ["brands", page, search, category, sort],
    queryFn: async () => {
      const response = await axios.get("/brands", {
        params: {
          page,
          search,
          category: category === "" ? undefined : category,
          sort,
        },
      });
      return response.data;
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/categories");
      return response.data;
    },
  });

  const categories =
    categoriesData?.data?.categories.map((cat: Category) => {
      return {
        _id: cat._id,
        title: cat.title,
      };
    }) || [];

  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        minHeight: "calc(100vh - 64px)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#1A202C",
            textAlign: "center",
          }}
        >
          Our Trusted Brands
        </Typography>
        <Typography
          sx={{ mb: 6, color: "#64748B", textAlign: "center" }}
          variant="h6"
        >
          Discover quality products from world-class manufacturers
        </Typography>

        {/* Filters */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#64748B" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat: Category) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="-products">Products Count</MenuItem>
                <MenuItem value="updatedAt">Newest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Category Chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}
        >
          {categories.map((cat: Category) => (
            <Chip
              key={cat._id}
              label={cat.title}
              onClick={() => setCategory(cat._id)}
              sx={{
                backgroundColor: category === cat._id ? "#3B82F6" : "white",
                color: category === cat._id ? "white" : "#1A202C",
                "&:hover": {
                  backgroundColor: category === cat._id ? "#2563EB" : "#F1F5F9",
                },
              }}
            />
          ))}
        </Stack>

        {/* Brands Grid */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {isLoading
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#E2E8F0",
                    }}
                  >
                    <Box sx={{ height: 200 }} />
                  </Card>
                </Grid>
              ))
            : data?.data?.brands.map((brand: Brand) => (
                <Grid
                  component={Link}
                  to={`/brands/${brand._id}`}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={brand._id}
                  sx={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={brand.image}
                      alt={brand.title}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                      >
                        {brand.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {brand.description}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Chip
                          label={
                            categories.find(
                              (cat: Category) => cat._id === brand.category
                            )?.title || "Unknown Category"
                          }
                          size="small"
                          sx={{ backgroundColor: "#F1F5F9" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {brand.products.length} Products
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#1A202C",
                "&.Mui-selected": {
                  backgroundColor: "#3B82F6",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#2563EB",
                  },
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default BrandsPage;
