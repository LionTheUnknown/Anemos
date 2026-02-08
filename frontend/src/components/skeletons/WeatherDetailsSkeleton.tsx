import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Item } from '../Item';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';

export default function WeatherDetailsSkeleton() {
  return (
    <Grid container spacing={1} size={8} columns={8} sx={{ justifyContent: 'space-around', alignItems: 'baseline' }}>
      <Grid size={8}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
          <Item>
            <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AirIcon />
                <Skeleton variant="text" width={100} height={28} />
              </Box>
              <Skeleton variant="text" width={48} height={32} />
            </Stack>
          </Item>

          <Item>
            <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <WaterDropIcon />
                <Skeleton variant="text" width={80} height={28} />
              </Box>
              <Skeleton variant="text" width={48} height={32} />
            </Stack>
          </Item>

          <Item>
            <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CloudySnowingIcon />
                <Skeleton variant="text" width={120} height={28} />
              </Box>
              <Skeleton variant="text" width={48} height={32} />
            </Stack>
          </Item>
        </Stack>
      </Grid>

      <Grid size="grow">
        <Item>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <WbTwilightIcon sx={{ fontSize: { xs: '2.75rem', sm: '3.25rem', md: '3.75rem', lg: '4.125rem', xl: '4.75rem' } }} />
            <Skeleton variant="text" width={180} height={32} />
          </Stack>
        </Item>
      </Grid>
    </Grid>
  );
}
