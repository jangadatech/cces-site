'use client'

import { SessionProvider, useSession} from "next-auth/react"

interface NextAuthProviderProps {
  children: React.ReactNode;
}

const NextAuthProvider = ({ children }: NextAuthProviderProps) => {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthProvider
