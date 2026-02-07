import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import { useTempUnit } from '../common/context/TempUnitContext';

type FormatTempButtonProps = IconButtonProps;

export default function FormatTempButton(props: FormatTempButtonProps) {
  const { unit, toggleUnit } = useTempUnit();
  const { onClick, ...rest } = props;

  return (
      <IconButton
        {...rest}
        onClick={(e) => {
          onClick?.(e);
          toggleUnit();
        }}>
        °{unit.toUpperCase()}
      </IconButton>
  );
}