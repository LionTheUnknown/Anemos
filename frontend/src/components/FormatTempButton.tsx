import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';

type FormatTempButtonProps = IconButtonProps;

export default function FormatTempButton(props: FormatTempButtonProps) {
  return (
    <IconButton
      {...props}
    >
      °C
    </IconButton>
  );
}