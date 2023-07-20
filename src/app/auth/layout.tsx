'use client'

import NextLink from 'next/link';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from '../../components/Logo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Box component="main" sx={{ display: 'flex', flex: '1 1 auto' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ flex: '1 1 auto' }}>
          <Grid xs={12} lg={6} sx={{ backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Box
              component="header"
              sx={{
                left: 0,
                p: 3,
                position: 'fixed',
                top: 0,
                width: '100%',
              }}
            >
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: 'inline-flex',
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
            </Box>
            {children}
          </Grid>
        </Grid>
      </Box>
    </html>
  );
}