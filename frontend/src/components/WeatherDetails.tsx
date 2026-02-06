import Grid from '@mui/material/Grid';
import type { CityWeather } from '../common/types/forecast';
import { Item } from './Item';
import Stack from '@mui/material/Stack';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';

interface WeatherDetailsProps {
  forecast: CityWeather | undefined;
  twilightTime: string | null;
}

export default function WeatherDetails({ forecast, twilightTime }: WeatherDetailsProps) {
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
                <div className="text-lg"><AirIcon/> Wind Status</div>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <div className="text-2xl">{forecast?.windSpeed}</div>
                  <div> km/h</div>
                </Stack>
              </Stack>
            </Item>

            <Item>
              <Stack spacing={1} sx={{alignItems: "flex-end"}}>
                <div className="text-lg"><WaterDropIcon/> Humidity</div>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <div className="text-2xl">{forecast?.humidity}</div>
                  <div> %</div>
                </Stack>
              </Stack>
            </Item>

            <Item>
              <Stack spacing={1} sx={{alignItems: "flex-end"}}>
                <div className="text-lg"><CloudySnowingIcon/> Chance of rain</div>

                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <div className="text-2xl">{forecast?.rain != null ? Math.round(forecast.rain * 100) : '—'}</div>
                  <div> %</div>
                </Stack>
              </Stack>
            </Item>
          </Stack>
        </Grid>

        <Grid size="grow">
          <Item>
            <Stack direction="row" spacing={1} sx={{
              justifyContent: "flex-start",
              alignItems: "center",}}>
              <WbTwilightIcon sx={{fontSize: '60px'}} />
              <div className="text-xl">{twilightTime}</div>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
