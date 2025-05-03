import { Box, Container } from "@mui/material";
import OurProducts from "../../components/OurProducts/OurProducts";

const ProductsPage = () => {
  return (
    <Box component="main">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <OurProducts />
      </Container>
    </Box>
  );
};

export default ProductsPage;
