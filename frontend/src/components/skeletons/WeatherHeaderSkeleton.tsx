import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function WeatherHeaderSkeleton() {
  return (
    <Grid container columns={8} size={8}>
      <Grid size={4}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: { xs: 80, sm: 100, md: 128, lg: 150, xl: 256 },
            height: { xs: 80, sm: 100, md: 128, lg: 150, xl: 256 },
            borderRadius: 1,
          }}
        />
      </Grid>
      <Grid size={4}>
        <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
          <Stack sx={{ alignItems: 'flex-end' }}>
            <Skeleton variant="text" width={80} height={48} />
            <Skeleton variant="text" width={60} height={32} />
          </Stack>
          <Stack sx={{ alignItems: 'flex-end' }}>
            <Skeleton variant="text" width={120} height={36} />
            <Skeleton variant="text" width={100} height={32} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
