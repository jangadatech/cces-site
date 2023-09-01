'use client'

import React, { Suspense, useState } from 'react';
import SideNav from './side-nav';
import { Box, CssBaseline } from '@mui/material';
import TopNav from './top-nav';
import { AuthGuard } from '@/guards/auth-guard';
import Loading from './loading';
import {MyContextProvider} from '@/contexts/MyContext';

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
        <body >
          <MyContextProvider>
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopNav />
                <SideNav open={open} handleDrawer={handleDrawer} />
                  <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                    {children}
                  </Box>
                </Box>
              </Suspense>
            </AuthGuard>
          </MyContextProvider>

        </body>
      </html>
    </>
  );
}
