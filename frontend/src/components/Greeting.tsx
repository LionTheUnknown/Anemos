import Box from '@mui/material/Box';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Greeting() {
  return (
    <Box sx={{ fontSize: 'clamp(2rem, 4vh, 3.5rem)' }}>
      {getGreeting()}
    </Box>
  );
}
