'use client'

import NextAuthProvider from "@/components/NextAuthProvider";
import '../themes/styles.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <>
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
    </>
  );
}
