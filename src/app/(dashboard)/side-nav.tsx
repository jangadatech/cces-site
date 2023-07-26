'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardIcon from '@mui/icons-material/CardGiftcard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SideNavItem from './side-nav-item';
import { Box } from '@mui/material';
import { Logo } from '@/components/Logo';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { theme as styles } from '@/themes';

interface SideNavProps {
  open: boolean;
  handleDrawer: () => void;
}

const SideNavWrapper = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? 240 : 54,
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
    fontFamily: 'sans-serif',
    backgroundColor: styles.colors.neutral_800,
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const BottomNavContainer = styled('div')({
  position: 'absolute',
  bottom: 10,
  width: '100%',
});

const SideNav = ({ open, handleDrawer }: SideNavProps) => {

  const router = useRouter()


  const handlerSignOut = async () => {
    await signOut({
      redirect: false
    })
    router.replace('/auth/signin')
  }

  return (
    <SideNavWrapper variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          p: open ? 3 : 1,
          mb: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 32,
            width: 32,
          }}
        >
          <Logo />
        </Box>
      </Box>
      <div>
        <SideNavItem icon={<CardIcon />} open={open} path={'/'} text="Dashboard" />
        <SideNavItem icon={<CardIcon />} open={open} path={'/input-output'} text="Entrada e Saída" />
        <SideNavItem icon={<CardIcon />} open={open} path={'/auth/signin'} text="Login" />
        <SideNavItem icon={<CardIcon />} open={open} path={'/users'} text="Usuários" />
      </div>
      <BottomNavContainer>
        <Divider /> 
        <SideNavItem icon={<LogoutIcon />} open={open} text="Sair" handlerSignOut={handlerSignOut}/>
      </BottomNavContainer>
    </SideNavWrapper>
  );
};

export default SideNav;
