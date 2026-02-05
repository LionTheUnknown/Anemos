import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '1rem',
  }),
}));
