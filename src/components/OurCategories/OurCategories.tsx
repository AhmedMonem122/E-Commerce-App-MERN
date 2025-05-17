import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Skeleton,
} from "@mui/material";
// import LaptopIcon from "@mui/icons-material/Laptop";
// import CheckroomIcon from "@mui/icons-material/Checkroom";
// import ChairIcon from "@mui/icons-material/Chair";
// import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import WatchIcon from "@mui/icons-material/Watch";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "src/api/axios";
import LoadingSkeleton from "./LoadingSkeleton";

type Category = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

// const categories = [
//   {
//     name: "Electronics",
//     icon: <LaptopIcon sx={{ fontSize: 40 }} />,
//     color: "#3B82F6",
//     url: "/categories/electronics",
//   },
//   {
//     name: "Fashion",
//     icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
//     color: "#EC4899",
//     url: "/categories/fashion",
//   },
//   {
//     name: "Home & Living",
//     icon: <ChairIcon sx={{ fontSize: 40 }} />,
//     color: "#8B5CF6",
//     url: "/categories/home-living",
//   },
//   {
//     name: "Beauty",
//     icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 40 }} />,
//     color: "#F59E0B",
//     url: "/categories/beauty",
//   },
//   {
//     name: "Sports",
//     icon: <SportsSoccerIcon sx={{ fontSize: 40 }} />,
//     color: "#10B981",
//     url: "/categories/sports",
//   },
//   {
//     name: "Automotive",
//     icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
//     color: "#EF4444",
//     url: "/categories/automotive",
//   },
//   {
//     name: "Accessories",
//     icon: <WatchIcon sx={{ fontSize: 40 }} />,
//     color: "#6366F1",
//     url: "/categories/accessories",
//   },
//   {
//     name: "Kitchen",
//     icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
//     color: "#F97316",
//     url: "/categories/kitchen",
//   },
// ];

const OurCategories = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/categories");
      return response.data;
    },
  });

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="lg">
        {isLoading ? (
          <>
            <Skeleton
              variant="text"
              width="40%"
              height={60}
              sx={{ mb: 2, mx: "auto" }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={40}
              sx={{ mb: 6, mx: "auto" }}
            />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 2, fontWeight: 700, color: "#1A202C" }}
            >
              Shop by Category
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ mb: 6, color: "#64748B" }}
            >
              Explore our wide range of products across various categories
            </Typography>

            <Grid container spacing={4}>
              {data?.data?.categories?.map((category: Category) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.title}>
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                        "& .category-icon": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() =>
                        navigate(`/categories/${category.title.toLowerCase()}`)
                      }
                      sx={{ height: "100%", p: 2 }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: "50%",
                            backgroundColor: "#3B82F610",
                            color: "#3B82F6",
                            transition: "transform 0.3s ease",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="category-icon"
                        >
                          <Box
                            component="img"
                            src={category.image}
                            alt={category.title}
                            sx={{
                              objectFit: "contain",
                              borderRadius: "50%",
                              width: "100px",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: "#1A202C",
                          }}
                        >
                          {category.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            color: "#64748B",
                          }}
                        >
                          {category.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default OurCategories;
