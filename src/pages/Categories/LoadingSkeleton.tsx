import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Grid container spacing={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton height={32} width="60%" sx={{ mb: 1 }} />
              <Skeleton height={20} width="80%" sx={{ mb: 1 }} />
              <Skeleton height={20} width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
