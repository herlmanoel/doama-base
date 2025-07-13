'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { UserProvider } from '@/app/context/user-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ActiveThemeProvider>
        <UserProvider>
          <SessionProvider>{children}</SessionProvider>
        </UserProvider>
      </ActiveThemeProvider>
    </>
  );
}
