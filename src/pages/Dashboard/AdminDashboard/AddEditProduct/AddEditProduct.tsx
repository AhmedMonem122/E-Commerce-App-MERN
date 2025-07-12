import { useActionState, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../../api/axios";
import type { Brand } from "src/types/brands.type";
import type { Category } from "src/types/categories.type";

interface AddEditProductProps {
  mode?: "add" | "edit";
}

interface ProductState {
  title: string;
  titleError: string | null;
  description: string;
  descriptionError: string | null;
  price: string;
  priceError: string | null;
  brand: string;
  brandError: string | null;
  category: string;
  categoryError: string | null;
  imageCover: File | null;
  imageCoverError: string | null;
  images: File[];
  imagesError: string | null;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const AddEditProduct = ({ mode = "add" }: AddEditProductProps) => {
  const { id } = useParams();
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  // Fetch product data if in edit mode
  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    },
    enabled: mode === "edit" && !!id,
  });

  const { data: brandData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("/brands");
      return res.data;
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/categories");
      return res.data;
    },
  });

  const initialState: ProductState = {
    title: "",
    titleError: null,
    description: "",
    descriptionError: null,
    price: "",
    priceError: null,
    brand: "",
    brandError: null,
    category: "",
    categoryError: null,
    imageCover: null,
    imageCoverError: null,
    images: [],
    imagesError: null,
  };

  const addProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return axios.patch(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const addEditProductAction = async (
    prevState: ProductState,
    formData: FormData
  ) => {
    const newState: ProductState = {
      ...prevState,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      imageCover: formData.get("imageCover") as File,
      images: formData.getAll("images") as File[],
    };

    // Validate fields
    newState.titleError = newState.title ? null : "Title is required";
    newState.descriptionError = newState.description
      ? null
      : "Description is required";
    newState.priceError = newState.price ? null : "Price is required";
    newState.brandError = newState.brand ? null : "Brand is required";
    newState.categoryError = newState.category ? null : "Category is required";
    newState.imageCoverError = newState.imageCover
      ? null
      : "Cover image is required";
    newState.imagesError =
      newState.images.length > 0
        ? null
        : "At least one product image is required";

    // Check for any errors
    if (
      newState.titleError ||
      newState.descriptionError ||
      newState.priceError ||
      newState.brandError ||
      newState.categoryError ||
      newState.imageCoverError ||
      newState.imagesError
    ) {
      return newState;
    }

    try {
      const data = new FormData();
      data.append("title", newState.title);
      data.append("description", newState.description);
      data.append("price", newState.price);
      data.append("brand", newState.brand);
      data.append("category", newState.category);
      if (newState.imageCover) data.append("imageCover", newState.imageCover);
      newState.images.forEach((img) => data.append("images", img));

      if (mode === "add") {
        await addProductMutation.mutateAsync(data);
      } else {
        await editProductMutation.mutateAsync(data);
      }

      return initialState;
    } catch (error) {
      return {
        ...newState,
        titleError: "Failed to save product",
      };
    }
  };

  const [state, formAction] = useActionState(
    addEditProductAction,
    initialState
  );

  const handleImageCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageCover(e.target.files[0]);
      state.imageCover = imageCover;
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 4);
      setImages(newImages);
      state.images = images;
    }
  };

  const removeImage = (index: number) => {
    setImages(state.images.filter((_, i) => i !== index));
    state.images = images;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          component="form"
          action={formAction}
          noValidate
          encType="multipart/form-data"
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                defaultValue={state.title}
                error={!!state.titleError}
                helperText={state.titleError}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                defaultValue={state.description}
                error={!!state.descriptionError}
                helperText={state.descriptionError}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="price"
                label="Price"
                type="number"
                defaultValue={state.price}
                error={!!state.priceError}
                helperText={state.priceError}
                inputProps={{ step: "0.01" }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required error={!!state.brandError}>
                <InputLabel>Brand</InputLabel>
                <Select name="brand" defaultValue={state.brand} label="Brand">
                  {brandData?.data?.brands.map((b: Brand) => (
                    <MenuItem key={b._id} value={b._id}>
                      {b.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required error={!!state.categoryError}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  defaultValue={state.category}
                  label="Category"
                >
                  {categoryData?.data?.categories.map((c: Category) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Cover Image
                <VisuallyHiddenInput
                  name="imageCover"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageCoverChange}
                />
              </Button>
              {/* Show cover image as a Chip with Avatar and delete button */}
              {imageCover && (
                <Box mt={2} display="flex" gap={1}>
                  <Chip
                    avatar={<Avatar src={URL.createObjectURL(imageCover)} />}
                    label={imageCover.name}
                    onDelete={() => setImageCover(null)}
                  />
                </Box>
              )}
              {state.imageCoverError && (
                <Typography color="error" variant="caption">
                  {state.imageCoverError}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Product Images (Max 4)
                <VisuallyHiddenInput
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </Button>
              <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                {images.map((img, index) => (
                  <Chip
                    key={index}
                    avatar={<Avatar src={URL.createObjectURL(img)} />}
                    label={img.name}
                    onDelete={() => removeImage(index)}
                  />
                ))}
              </Box>
              {state.imagesError && (
                <Typography color="error" variant="caption">
                  {state.imagesError}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEditProduct;
