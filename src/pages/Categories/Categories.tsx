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
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "../../api/axios";
import LoadingSkeleton from "./LoadingSkeleton";

type Category = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: string[];
};

const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", search],
    queryFn: async () => {
      const response = await axios.get("/categories", {
        params: { search },
      });
      return response.data;
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        minHeight: "calc(100vh - 64px)",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#1A202C",
            textAlign: "center",
          }}
        >
          Product Categories
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 6, color: "#64748B", textAlign: "center" }}
        >
          Explore our wide range of product categories
        </Typography>

        <Box sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748B" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Grid container spacing={4}>
            {data?.data?.categories?.map((category: Category) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={category._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                      "& .category-image": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                  onClick={() =>
                    navigate(`/categories/${category.title.toLowerCase()}`)
                  }
                >
                  <Box sx={{ position: "relative", pt: "60%" }}>
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.title}
                      className="category-image"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, bgcolor: "white" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 600, color: "#1A202C" }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, color: "#64748B" }}
                    >
                      {category.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#3B82F6", fontWeight: 500 }}
                    >
                      {category.products.length} Products
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CategoriesPage;
