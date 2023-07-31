import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/signin')
    }
  })


  return (
    <>
      { !session && null }
      { session && children }
    </>
  )
}