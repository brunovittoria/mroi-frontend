import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import Box, { BoxProps } from '@mui/material/Box';
//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
}

const Iconify = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      className="component-iconify"
      sx={{ width, height: width, ...sx }}
      {...other}
    >
      <Icon
        icon={icon}
        width={width as string | number}
        height={width as string | number}
      />
    </Box>
  )
);

export default Iconify;
