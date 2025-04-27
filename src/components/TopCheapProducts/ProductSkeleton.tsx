import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
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
          sx={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.1rem", mb: 1, width: "80%" }}
          />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "40%" }} />
          <Skeleton variant="rounded" width={100} height={20} sx={{ mt: 1 }} />
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Skeleton variant="rectangular" height={36} width="100%" />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductSkeleton;
