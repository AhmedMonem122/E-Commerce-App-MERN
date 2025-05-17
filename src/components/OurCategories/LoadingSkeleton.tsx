import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Grid container spacing={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
          <Card sx={{ height: "100%", backgroundColor: "white" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Skeleton
                variant="circular"
                width={100}
                height={100}
                sx={{ mb: 2 }}
              />
              <Skeleton width="60%" height={32} sx={{ mb: 1 }} />
              <Skeleton width="80%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
