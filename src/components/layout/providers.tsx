'use client';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { UserProvider } from '@/app/context/user-context';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <UserProvider>
          <ClerkProvider
            appearance={{
              baseTheme: resolvedTheme === 'dark' ? dark : undefined
            }}
          >
            {children}
          </ClerkProvider>
        </UserProvider>
      </ActiveThemeProvider>
    </>
  );
}
