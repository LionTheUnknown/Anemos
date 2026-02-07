import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Item } from '../Item';

export default function WeatherGraphSkeleton() {
  return (
    <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: 'stretch' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Item key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <Skeleton variant="text" width={60} height={32} />
          <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" width={48} height={32} />
        </Item>
      ))}
    </Stack>
  );
}
