'use client'

import NextAuthProvider from "@/components/NextAuthProvider";

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
