'use client'

import NextAuthProvider from "@/components/NextAuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <>
      <html>
        <body>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </body>
      </html>
    </>
  );
}
