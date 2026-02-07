import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import type { CityWeather } from '../common/types/forecast';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';

const FogEffect = lazy(() => import('./background/fog/FogEffect'));
const RainEffect = lazy(() => import('./background/rain/RainEffect'));
const SnowEffect = lazy(() => import('./background/snow/SnowEffect'));

const EFFECT_BACKGROUND = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect fill="#121212" width="256" height="256"/></svg>');

export type EffectType = 'fog' | 'rain' | 'snow' | 'default';

export interface EffectConfig {
  effect: EffectType;
  fogType?: 'light' | 'dense';
  rainType?: 'rain' | 'storm' | 'drizzle' | 'fallout';
  snowType?: 'gentle' | 'storm';
}

export function getEffectFromWeather(forecast: CityWeather | undefined): EffectConfig {
  if (!forecast?.weather_code) return { effect: 'default' };

  const code = Number(forecast.weather_code);
  const info = WEATHER_CODE_MAP[code];

  if (!info) return { effect: 'default' };

  switch (info.group) {
    case 'clear':
      return { effect: 'default' };
    case 'fog':
      return { effect: 'fog', fogType: code === 48 ? 'dense' : 'light' };
    case 'rain':
    case 'sleet':
      return { effect: 'rain', rainType: code === 95 ? 'storm' : 'rain' };
    case 'drizzle':
      return { effect: 'rain', rainType: 'drizzle' };
    case 'snow':
      return {
        effect: 'snow',
        snowType: 'gentle',
      };
    default:
      return { effect: 'fog', fogType: 'light' };
  }
}

interface BackgroundApplierProps extends EffectConfig {
  fillContainer?: boolean;
}

export default function BackgroundApplier({ effect, fogType, rainType, snowType, fillContainer = false }: BackgroundApplierProps) {

  const effectProps = {
    backgroundImageUrl: EFFECT_BACKGROUND,
    fillContainer,
  };

  return (
    <Box
      sx={{
        position: fillContainer ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: fillContainer ? '100%' : '100vw',
        height: fillContainer ? '100%' : '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <Suspense fallback={null}>
        {effect === 'fog' && (
          <FogEffect {...effectProps} type={fogType ?? 'light'} />
        )}
        {effect === 'rain' && (
          <RainEffect {...effectProps} type={rainType ?? 'rain'} />
        )}
        {effect === 'snow' && (
          <SnowEffect {...effectProps} type={snowType ?? 'gentle'} />
        )}
      </Suspense>
    </Box>
  );
}
