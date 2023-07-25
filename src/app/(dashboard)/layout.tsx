'use client'

import React, { useState } from 'react';
import SideNav from './side-nav';
import { Box, CssBaseline } from '@mui/material';
import TopNav from './top-nav';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter()
  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated(){
      router.replace('/auth/signin')
    }
  })

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
              <SideNav open={open} handleDrawer={handleDrawer} />
              <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
                {children}
              </Box>
            </Box>
        </body>
      </html>
    </>
  );
}
