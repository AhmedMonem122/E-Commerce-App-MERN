import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Divider,
  TextField,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import axios from "../../api/axios";
import useAuth from "../../hooks/use-auth";

type Review = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  reactions: string;
  review: string;
  createdAt: string;
};

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  imageCover: string;
  category: string;
  brand: string;
  reviews: Review[];
  ratingsAverage: number;
  ratingsQuantity: number;
};

const ProductDetailsPage = ({
  id,
  data,
}: {
  id: string;
  data: {
    data: { product: Product };
  } | null;
}) => {
  const {
    isAuthenticated,
    // user
  } = useAuth();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { data: brandData, isLoading: isBrandLoading } = useQuery({
    queryKey: ["brand", data?.data?.product?.brand],
    queryFn: async () => {
      const response = await axios.get(`/brands/${data?.data?.product?.brand}`);
      return response.data;
    },
  });

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category", data?.data?.product?.category],
    queryFn: async () => {
      const response = await axios.get(
        `/categories/${data?.data?.product?.category}`
      );
      return response.data;
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data: { rating: number; comment: string }) => {
      return axios.post(`/products/${id}/reviews`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      handleCloseReviewDialog();
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async (data: { rating: number; comment: string }) => {
      return axios.patch(`/products/${id}/reviews/${editingReview?._id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      handleCloseReviewDialog();
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      return axios.delete(`/products/${id}/reviews/${reviewId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const handleOpenReviewDialog = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      setRating(review.rating);
      setComment(review.review);
    } else {
      setEditingReview(null);
      setRating(0);
      setComment("");
    }
    setReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setReviewDialog(false);
    setEditingReview(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitReview = () => {
    if (editingReview) {
      updateReviewMutation.mutate({ rating, comment });
    } else {
      addReviewMutation.mutate({ rating, comment });
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Product Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative", mb: 2 }}>
              <Box
                component="img"
                src={data?.data?.product?.images[selectedImage]}
                alt={data?.data?.product?.title}
                sx={{
                  width: "100%",
                  height: "500px",
                  objectFit: "contain",
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              />
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ overflowX: "auto", py: 2 }}
            >
              {data?.data?.product?.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${data?.data?.product?.title}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      selectedImage === index ? "2px solid #3B82F6" : "none",
                  }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Product Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              {data?.data?.product?.title}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Rating
                value={data?.data?.product?.ratingsAverage}
                precision={0.5}
                readOnly
              />
              <Typography color="text.secondary">
                ({data?.data?.product?.reviews.length} reviews)
              </Typography>
            </Stack>
            <Typography
              variant="h5"
              sx={{ mb: 3, color: "#3B82F6", fontWeight: 600 }}
            >
              ${data?.data?.product?.price}
            </Typography>
            <Typography sx={{ mb: 3 }}>
              {data?.data?.product?.description}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {isBrandLoading ? (
                <Chip
                  icon={<CircularProgress size={16} />}
                  label="Loading brand..."
                />
              ) : (
                <Chip label={`Brand: ${brandData?.data?.brand?.title}`} />
              )}
              {isCategoryLoading ? (
                <Chip
                  icon={<CircularProgress size={16} />}
                  label="Loading category..."
                />
              ) : (
                <Chip
                  label={`Category: ${categoryData?.data?.category?.title}`}
                />
              )}

              {/* <Chip
                label={`Stock: ${data?.product?.stock}`}
                color={data?.product?.stock > 0 ? "success" : "error"}
              /> */}
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
              <IconButton
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 1,
                  width: 48,
                  height: 48,
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 8 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Customer Reviews
            </Typography>
            {isAuthenticated && (
              <Button
                variant="outlined"
                onClick={() => handleOpenReviewDialog()}
                startIcon={<StarIcon />}
              >
                Write a Review
              </Button>
            )}
          </Stack>

          <Grid container spacing={3}>
            {data?.data?.product?.reviews.map((review) => (
              <Grid size={{ xs: 12 }} key={review._id}>
                <Card>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6">{review.user.name}</Typography>
                        <Rating value={review.rating} readOnly size="small" />
                      </Stack>
                      {isAuthenticated && (
                        //   ===
                        //        && user?._id
                        //     review.user._id &&
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenReviewDialog(review)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              deleteReviewMutation.mutate(review._id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography>{review.review}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Review Dialog */}
        <Dialog
          open={reviewDialog}
          onClose={handleCloseReviewDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingReview ? "Edit Your Review" : "Write a Review"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography sx={{ mb: 1 }}>Rating</Typography>
                  <Rating
                    value={rating}
                    onChange={(_, value) => setRating(value || 0)}
                    size="large"
                  />
                </Box>
                <TextField
                  label="Your Review"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReviewDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              disabled={!rating || !comment}
            >
              {editingReview ? "Update Review" : "Submit Review"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProductDetailsPage;
