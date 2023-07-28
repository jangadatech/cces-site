'use client'

import '../themes/styles.css';
import { ThemeProvider } from "@mui/material";
import customTheme from "@/providers/custom-theme";
import NextAuthProvider from '@/providers/NextAuthProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <>
      <NextAuthProvider>
      <ThemeProvider theme={customTheme}>
        {children}
      </ThemeProvider>
      </NextAuthProvider>
    </>
  );
}
