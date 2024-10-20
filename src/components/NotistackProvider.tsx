'use client';

import { ReactNode, useRef } from 'react';
import { SnackbarKey, SnackbarProvider } from 'notistack';

import { alpha } from '@mui/material/styles';

import { GlobalStyles, Box, useTheme, BoxProps } from '@mui/material';

import { IconifyIcon } from '@iconify/react';

import { IconButtonAnimate } from './animate';
import Iconify from './iconify';

function SnackbarStyles() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <GlobalStyles
      styles={{
        '.notistack-MuiContent': {
          width: '100%',
          padding: theme.spacing(1),
          margin: theme.spacing(0.25, 0),
          boxShadow: theme.customShadows.z8,
          borderRadius: theme.shape.borderRadius,
          /* 
          color: theme.palette.grey[isDark ? 0 : 800],
          backgroundColor: theme.palette.grey[isDark ? 900 : 0], 
          */
          '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
            {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper
            },
          [theme.breakpoints.up('md')]: {
            minWidth: 240
          }
        },
        '.SnackbarItem-message': {
          padding: '0 !important',
          fontWeight: theme.typography.fontWeightMedium
        },
        '.SnackbarItem-action': {
          marginRight: 0,
          color: theme.palette.action.active,
          '& svg': { width: 20, height: 20 }
        }
      }}
    />
  );
}

type Props = {
  children: ReactNode;
};

export default function NotistackProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        style={{ maxWidth: '450px' }}
        preventDuplicate
        autoHideDuration={5000} // 5 seconds
        variant="success"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: (
            <SnackbarIcon
              icon="eva:info-fill"
              sx={{
                color: 'info.main',
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.16)
              }}
            />
          ),
          success: (
            <SnackbarIcon
              icon="eva:checkmark-circle-2-fill"
              sx={{
                color: 'success.main',
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.16)
              }}
            />
          ),
          warning: (
            <SnackbarIcon
              icon="eva:alert-triangle-fill"
              sx={{
                color: 'warning.main',
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.16)
              }}
            />
          ),
          error: (
            <SnackbarIcon
              icon="eva:alert-circle-fill"
              sx={{
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              }}
            />
          )
        }}
        action={(key) => (
          <IconButtonAnimate
            size="small"
            onClick={onClose(key)}
            sx={{ p: 0.5, mb: 'auto' }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

type SnackbarIconProps = Pick<BoxProps, 'sx'> & {
  icon: IconifyIcon | string;
  className?: string;
};

export const SnackbarIcon = ({ icon, className, sx }: SnackbarIconProps) => {
  return (
    <Box
      component="span"
      sx={{
        p: 1,
        mr: 1.5,
        width: 45,
        height: 45,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Iconify className={className} icon={icon} width={24} height={24} />
    </Box>
  );
};
