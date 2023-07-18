'use client'
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardIcon from '@mui/icons-material/CardGiftcard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import typography from '@/themes/typography';
import SideNavItem from './side-nav-item';
import palette from '@/themes/palette';
import { useRouter } from 'next/router';

interface SideNavProps {
  open: boolean;
  handleDrawerClose: () => void;
  children: React.ReactNode;
}

const SideNavWrapper = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? 240: 54,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      '& .MuiDrawer-paper': {
        width: 240,
      },
    }),
    ...(!open && {
      '& .MuiDrawer-paper': {
        width: 54,
      },
    }),
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.base,
    backgroundColor: palette.background.default,
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  fontSize: typography.fontSize.lg, 
}));

const SideNav = ({ open, handleDrawerClose, children }: SideNavProps) => {
  const theme = useTheme();

  return (
    <SideNavWrapper variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <SideNavItem 
        icon={<CardIcon sx={{ color: palette.text.primary }}/>} 
        open={open} 
        path={'/'} 
        text='Dashboard'
        />
      <SideNavItem icon={<CardIcon sx={{ color: palette.text.primary }} />} open={open} path={'/input-output'} text='Entrada e Saída'/>
      <Divider />
      <SideNavItem icon={<CardIcon sx={{ color: palette.text.primary }} />} open={open} path={'/sign-out'} text='Sair'/>
    </SideNavWrapper>
  );
};

export default SideNav;
