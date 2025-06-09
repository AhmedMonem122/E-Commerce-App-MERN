import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useActionState } from "react";
import { useSnackbar } from "src/hooks/use-snackbar";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import useAuth from "src/hooks/use-auth";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type UpdateInformationActionState = {
  name: string;
  email: string;
  photo: File | null;
  nameError: string | null;
  emailError: string | null;
  photoError: string | null;
};

const UpdateProfileForm = () => {
  const { data, refetch } = useAuth();
  const { setSnackbar, closeSnackbar, snackbar } = useSnackbar();

  const updateProfileInformationMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await axios.patch("/users/updateMe", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
      setSnackbar({
        open: true,
        message: "Information updated successfully.",
        severity: "success",
      });
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message || "Failed to update information!",
        severity: "error",
      });
    },
  });

  const initialState = {
    name: "",
    email: "",
    photo: null,
    nameError: null,
    emailError: null,
    photoError: null,
  };

  const updateInformationAction = async (
    prevState: UpdateInformationActionState,
    formData: FormData
  ) => {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      photo: formData.get("photo") as File | null,
    };

    let errors = {
      nameError: !data.name ? "Name is required" : null,
      emailError: !data.email
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        ? "Invalid email format"
        : null,
      photoError: null,
    };

    if (errors.nameError || errors.emailError) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "error",
      });
      return { ...prevState, ...data, ...errors };
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      if (data.photo) {
        formDataToSend.append("photo", data.photo);
      }

      await updateProfileInformationMutation.mutateAsync(formDataToSend);
      return { ...initialState };
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error instanceof Error ? error.message : "Failed to update profile",
        severity: "error",
      });
      return { ...prevState, ...data };
    }
  };

  const [state, formAction] = useActionState(
    updateInformationAction,
    initialState
  );

  return (
    <Paper sx={{ p: 3 }} component="form" action={formAction}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Update Profile Information
      </Typography>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={data?.data?.user?.photo || undefined}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload Photo
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              name="photo"
              hidden
            />
          </Button>
          <FormHelperText sx={{ color: "error.main" }}>
            {state.photoError}
          </FormHelperText>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            defaultValue={data?.data?.user?.name}
            focused
            error={!!state.nameError}
            helperText={state.nameError}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            defaultValue={data?.data?.user?.email}
            focused
            error={!!state.emailError}
            helperText={state.emailError}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ mt: 2 }}
            disabled={updateProfileInformationMutation.isPending}
          >
            {updateProfileInformationMutation.isPending
              ? "Updating..."
              : "Update Profile"}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UpdateProfileForm;
