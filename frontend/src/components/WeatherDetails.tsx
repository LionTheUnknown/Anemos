import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import type { CityWeather } from '../common/types/forecast';
import { Item } from './Item';
import Stack from '@mui/material/Stack';
import WeatherDetailsSkeleton from './skeletons/WeatherDetailsSkeleton';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';

interface WeatherDetailsProps {
  forecast: CityWeather | undefined;
  twilightTime: string | null;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export default function WeatherDetails({ forecast, twilightTime, isLoading, isEmpty }: WeatherDetailsProps) {
  if (isLoading || isEmpty) {
    return <WeatherDetailsSkeleton />;
  }

  return (
    <>
      <Grid container spacing={1} size={8} columns={8} sx={{
        justifyContent: "space-around",
        alignItems: "baseline"}}>
        <Grid size={8}>
          <Stack direction="row" spacing={1} sx={{
              justifyContent: "space-around",
              alignItems: "center",}}> 
            <Item>
              <Stack spacing={1} sx={{alignItems: "flex-end"}}>
                <Box sx={{ fontSize: { xs: '1.5rem', sm: '1.7rem', md: '1.5rem', lg: '1.875rem', xl: '2.125rem'}}}>
                  <AirIcon sx={{ flexShrink: 0 }} />
                  <Box component="span" sx={{ whiteSpace: 'nowrap' }}>Wind Status</Box>
                </Box>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Box sx={{ fontSize: { xs: '1.7rem', sm: '1.9rem', md: '2.25rem', lg: '2.5rem', xl: '2.75rem' } }}>{forecast?.windSpeed}</Box>
                  <Box component="span"> km/h</Box>
                </Stack>
              </Stack>
            </Item>

            <Item>
              <Stack spacing={1} sx={{alignItems: "flex-end"}}>
                <Box sx={{ fontSize: { xs: '1.5rem', sm: '1.7rem', md: '1.5rem', lg: '1.875rem', xl: '2.125rem' }}}>
                  <WaterDropIcon sx={{ flexShrink: 0 }} />
                  <Box component="span" sx={{ whiteSpace: 'nowrap'}}>Humidity</Box>
                </Box>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Box sx={{ fontSize: { xs: '1.7rem', sm: '1.9rem', md: '2.25rem', lg: '2.5rem', xl: '2.75rem' } }}>{forecast?.humidity}</Box>
                  <Box component="span"> %</Box>
                </Stack>
              </Stack>
            </Item>

            <Item>
              <Stack spacing={0.5} sx={{alignItems: "flex-end"}}>
                <Box sx={{ fontSize: { xs: '1.5rem', sm: '1.6rem', md: '1.5rem', lg: '1.76rem', xl: '2rem' }}}>
                  <CloudySnowingIcon sx={{ flexShrink: 0 }} />
                  <Box component="span" sx={{ whiteSpace: 'nowrap' }}>Precipitation</Box>
                </Box>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Box sx={{ fontSize: { xs: '1.7rem', sm: '1.9rem', md: '2.25rem', lg: '2.5rem', xl: '2.75rem' } }}>{forecast?.precipitation != null ? forecast.precipitation.toFixed(1) : '—'}</Box>
                  <Box component="span"> mm</Box>
                </Stack>
              </Stack>
            </Item>
          </Stack>
        </Grid>

        <Grid size="grow">
          <Item sx={{ padding:3}}>
            <Stack direction="row" spacing={1} sx={{
              justifyContent: "flex-start",
              alignItems: "center",}}>
              <WbTwilightIcon sx={{ fontSize: { xs: 44, sm: 52, md: 60, lg: 66, xl: 76 } }} />
              <Box sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem', lg: '2.125rem', xl: '2.25rem' } }}>{twilightTime}</Box>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
