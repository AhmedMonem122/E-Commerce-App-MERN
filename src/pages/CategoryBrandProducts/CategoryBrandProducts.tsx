import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Pagination,
  Stack,
  InputAdornment,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Chip,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import type { Product } from "src/types/products.type";
import { Form } from "react-router";
import { useSearchParams } from "react-router";

const CategoryBrandProductsPage = ({
  id,
  data,
}: {
  id: string;
  data: {
    data: { products: Product[]; totalPages: number };
  } | null;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get values from URL params or use defaults
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000";
  const rating = searchParams.get("rating") || "0";
  const page = searchParams.get("page") || "1";

  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 0;

  // Add these state variables
  const [localPrice, setLocalPrice] = useState<[number, number]>([Number(minPrice), Number(maxPrice)]);
  const [localRating, setLocalRating] = useState<number>(Number(rating));

  const FilterSection = () => (
    <Stack
      component={Form}
      method="get"
      spacing={3}
      sx={{ p: 2, width: isMobile ? "100%" : 250 }}
    >
      <Typography variant="h6" fontWeight={600}>
        Filters
      </Typography>

      <TextField
        fullWidth
        name="search"
        label="Search"
        defaultValue={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select name="sortBy" defaultValue={sortBy}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="+price">Price: Low to High</MenuItem>
          <MenuItem value="-price">Price: High to Low</MenuItem>
          <MenuItem value="-ratingsAverage">Highest Rated</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={localPrice}
          onChange={(_, value) => {
            setLocalPrice(value as [number, number]);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography>${localPrice[0]}</Typography>
          <Typography>${localPrice[1]}</Typography>
        </Stack>
        <input type="hidden" name="minPrice" value={localPrice[0]} />
        <input type="hidden" name="maxPrice" value={localPrice[1]} />
      </Box>

      <Box>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Rating
          value={localRating}
          onChange={(_, value) => {
            setLocalRating(value || 0);
          }}
          precision={0.5}
        />
        <input type="hidden" name="rating" value={localRating} />
      </Box>

      <input type="hidden" name="page" value="1" />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
      >
        Apply
      </Button>
    </Stack>
  );

  return (
    <Box sx={{ py: 4, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {data?.data?.products[0]?.category?.title ||
              data?.data?.products[0]?.brand?.title ||
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
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

            {totalPages > 1 && (
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

            {products.length === 0 && (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  No products found matching your criteria
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
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
