import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ borderRadius: 2, mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={80}
                  height={80}
                />
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton height={40} width="80%" sx={{ mb: 2 }} />
            <Skeleton height={24} width="40%" sx={{ mb: 2 }} />
            <Skeleton height={32} width="30%" sx={{ mb: 3 }} />
            <Skeleton height={100} sx={{ mb: 3 }} />
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Skeleton width={100} height={32} />
              <Skeleton width={100} height={32} />
              <Skeleton width={100} height={32} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Skeleton width="80%" height={48} />
              <Skeleton width={48} height={48} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailsSkeleton;
