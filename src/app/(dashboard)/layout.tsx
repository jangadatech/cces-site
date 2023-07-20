'use client'
import React, { useState } from 'react';
import SideNav from './side-nav';
import { Box, CssBaseline} from '@mui/material';
import TopNav from './top-nav';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <html>
        <body>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopNav />
            <SideNav open={open} handleDrawer={handleDrawer}>
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
