import { Box, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "../../../../api/axios";
import CircularProgress from '@mui/material/CircularProgress';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Overview = () => {
  const theme = useTheme();

  const data = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axios.get("/products/product-stats");
      return res.data;
    },
  });

  if (data.isLoading) return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{
          color: theme.palette.primary.main
        }}
      />
    </Box>
  );

  const priceData = [
    { name: "Min Price", value: data?.data?.data?.stats[0]?.minPrice },
    { name: "Avg Price", value: data?.data?.data?.stats[0]?.avgPrice },
    { name: "Max Price", value: data?.data?.data?.stats[0]?.maxPrice },
  ];

  const ratingData = [
    { name: "Products", value: data?.data?.data?.stats[0]?.numProducts },
    { name: "Ratings", value: data?.data?.data?.stats[0]?.numRatings },
    { name: "Avg Rating", value: data?.data?.data?.stats[0]?.avgRating },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Price Statistics */}
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Price Statistics
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Rating Statistics */}
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product Ratings
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {ratingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
