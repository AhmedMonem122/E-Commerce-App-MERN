import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Form, useSearchParams } from "react-router";
import { useState } from "react";

const FilterSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [searchParams] = useSearchParams();

  // Get values from URL params or use defaults
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000";
  const rating = searchParams.get("rating") || "0";

  const [localPrice, setLocalPrice] = useState<[number, number]>([
    Number(minPrice),
    Number(maxPrice),
  ]);
  const [localRating, setLocalRating] = useState<number>(Number(rating));

  return (
    <Stack
      component={Form}
      method="get"
      spacing={3}
      sx={{ width: isMobile ? "100%" : 250 }}
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
};

export default FilterSection;
