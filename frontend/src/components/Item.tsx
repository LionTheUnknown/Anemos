import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'rgba(70, 69, 69, 0.2)',
  backdropFilter: 'blur(0.1rem)',
  color: 'rgba(255, 255, 255)',
  ...theme.typography.body2,
  padding: '1rem',
  borderRadius: '1rem',
  textAlign: 'center',
}));
