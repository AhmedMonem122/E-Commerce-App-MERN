import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "../../../../components/ConfirmationDialog/ConfirmationDialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../../api/axios";
import { Avatar } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import type { User } from "src/types/users.type";

const DashboardUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const data = useQuery({
    queryKey: ["users", page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get("/users", {
        params: {
          limit: rowsPerPage,
          page: page + 1,
        },
      });
      return res.data;
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/products/${id}`);
    },
    onSuccess: () => {
      data.refetch();
      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: "Product deleted successfully!",
        severity: "success",
      });
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to delete product.",
        severity: "error",
      });
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (productId: string) => {
    setSelectedProduct(productId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Manage Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/admin/dashboard/users/add"
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.data?.users.map((user: User) => (
                <TableRow hover key={user._id}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={user.photo}
                      alt={user.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                      }}
                    >
                      {/* <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        component={Link}
                        to={`/admin/dashboard/users/view/${user._id}`}
                      >
                        View
                      </Button> */}
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`/admin/dashboard/users/edit/${user._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.data?.results || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Paper>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardUsers;
