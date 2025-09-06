import { useActionState, useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  type AlertColor,
} from "@mui/material";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type InvalidateQueryFilters,
} from "@tanstack/react-query";
import axios from "../../../../api/axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "user",
};

const AddEditUserForm = ({
  id,
  onSuccess,
}: {
  id?: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  async function fetchUser(id: string) {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }

  async function submitUser({
    id,
    values,
  }: {
    id?: string;
    values: typeof initialState;
  }) {
    const url = id ? `/users/${id}` : "/users";
    const method = id ? "patch" : "post";
    const { data } = await axios({
      url,
      method,
      data: values,
    });
    return data;
  }

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: submitUser,
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: id ? "User updated successfully" : "User added successfully",
        severity: "success",
      });
      queryClient.invalidateQueries(["users"] as InvalidateQueryFilters<
        readonly unknown[]
      >);
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to submit user",
        severity: "error",
      });
    },
  });

  const [state, formAction] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const values = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        passwordConfirm: formData.get("passwordConfirm") as string,
        role: formData.get("role") as string,
      };
      try {
        await mutation.mutateAsync({ id, values });
        return { ...values };
      } catch {
        return prevState;
      }
    },
    initialState
  );

  useEffect(() => {
    if (user && id) {
      formAction({
        get: (key) => user[key] || "",
      } as FormData);
    }
  }, [user, id]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit User" : "Add User"}
      </Typography>
      <Box
        component="form"
        action={formAction}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          defaultValue={state.name}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          defaultValue={state.email}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          defaultValue={state.password}
          required={!id}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          defaultValue={state.passwordConfirm}
          required={!id}
          fullWidth
        />
        <TextField
          select
          label="Role"
          name="role"
          defaultValue={state.role}
          fullWidth
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={mutation.isPending || userLoading}
        >
          {mutation.isPending || userLoading ? (
            <CircularProgress size={24} />
          ) : id ? (
            "Update User"
          ) : (
            "Add User"
          )}
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity as AlertColor}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddEditUserForm;
