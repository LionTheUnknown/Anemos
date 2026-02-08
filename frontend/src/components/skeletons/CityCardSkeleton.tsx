import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Item } from '../Item';

export default function CityCardSkeleton() {
  return (
    <Item sx={{ width: '100%', marginBottom: 1 }}>
      <Grid container size={4} columns={4} spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid size={2}>
          <Stack spacing={0.5}>
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="50%" height={24} />
          </Stack>
        </Grid>
        <Grid size={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="rectangular" width="3.5rem" height="3.5rem" sx={{ borderRadius: 1 }} />
        </Grid>
        <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="text" width={48} height={32} />
        </Grid>
      </Grid>
    </Item>
  );
}
