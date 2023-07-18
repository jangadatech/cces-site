'use client'
import React from 'react';
import TopNav from './top-nav';
import SideNav from './side-nav';
import { Box, CssBaseline} from '@mui/material';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <html>
        <body>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
            <SideNav open={open} handleDrawerClose={handleDrawerClose}>
            </SideNav>
            <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
              {children}
            </Box>
          </Box>
        </body>
      </html>
    </>
  );
}
