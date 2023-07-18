'use client'
import React from 'react';
import { Theme, styled, useTheme } from '@mui/material/styles';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface TopNavWrapperProps {
  theme: Theme;
  open: boolean;
}

const drawerWidth = 240;

const TopNavWrapper = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: TopNavWrapperProps) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

interface TopNavProps extends AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const TopNav = ({ open, handleDrawerOpen }: TopNavProps) => {
  const theme = useTheme();

  return (
    <TopNavWrapper position="fixed" open={open} theme={theme}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </TopNavWrapper>
  );
};

export default TopNav;