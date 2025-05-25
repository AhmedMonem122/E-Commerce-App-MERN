import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Skeleton,
} from "@mui/material";

const CategoryBrandProductsSkeleton = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={40} />
        </Stack>

        <Grid container spacing={3}>
          {/* Filter Section Skeleton */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Stack spacing={3} sx={{ p: 2 }}>
              <Skeleton variant="text" width={100} height={32} />
              <Skeleton variant="rectangular" height={56} />
              <Skeleton variant="rectangular" height={56} />
              <Box>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="rectangular" height={40} />
              </Box>
              <Box>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="rectangular" height={40} />
              </Box>
              <Skeleton variant="rectangular" height={40} />
            </Stack>
          </Grid>

          {/* Products Grid Skeleton */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      sx={{ p: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Skeleton variant="text" width="80%" height={32} />
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={120}
                          height={24}
                        />
                        <Skeleton variant="text" width={40} />
                      </Stack>
                      <Skeleton variant="text" width={80} height={32} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Skeleton variant="rectangular" width={300} height={40} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryBrandProductsSkeleton;
