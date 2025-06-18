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
import type { Product } from "src/types/products.type";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../../api/axios";
import { Avatar } from "@mui/material";

interface DashboardProductsProps {
  isAdmin?: boolean;
}

const DashboardProducts = ({ isAdmin = false }: DashboardProductsProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const data = useQuery({
    queryKey: ["products", page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get("/products", {
        params: {
          limit: rowsPerPage,
          page: page + 1,
        },
      });
      return res.data;
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
    // Add your delete logic here
    console.log("Deleting product:", selectedProduct);
    setOpenDialog(false);
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
          {isAdmin ? "Manage Products" : "Browse Products"}
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/admin/products/add"
          >
            Add Product
          </Button>
        )}
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.data?.products.map((product: Product) => (
                <TableRow hover key={product.id}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={product.imageCover}
                      alt={product.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography noWrap>{product.description}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>{product.brand?.title}</TableCell>
                  <TableCell>{product.category?.title}</TableCell>
                  <TableCell align="right">{product.ratingsAverage}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        component={Link}
                        to={`/products/${product.id}`}
                      >
                        View
                      </Button>
                      {isAdmin && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            component={Link}
                            to={`/admin/products/edit/${product.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
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
    </Container>
  );
};

export default DashboardProducts;
