import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      imageUrl?: string;
      fullName?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    imageUrl?: string;
    fullName?: string | null;
  }
}
