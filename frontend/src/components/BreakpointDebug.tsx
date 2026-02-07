import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BreakpointDebug() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  const active = isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : isXl ? 'xl' : '?';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        bgcolor: 'rgba(0,0,0,0.8)',
        color: '#0f0',
        p: 1,
        fontSize: 12,
        zIndex: 9999,
        fontFamily: 'monospace',
      }}
    >
      {window.innerWidth}px → {active}
    </Box>
  );
}
