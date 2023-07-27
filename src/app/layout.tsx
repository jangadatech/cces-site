'use client'

import NextAuthProvider from "@/components/NextAuthProvider";
import '../themes/styles.css';
import { ThemeProvider } from "@mui/material";
import customTheme from "@/providers/custom-theme";

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
