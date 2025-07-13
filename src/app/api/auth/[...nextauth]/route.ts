import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@gmail.com' &&
          credentials?.password === '123'
        ) {
          return {
            id: '1',
            email: 'admin@gmail.com',
            role: 'admin',
            imageUrl: 'https://avatars.githubusercontent.com/u/35230448?v=4',
            fullName: 'Herlanoel Fernandes Barbosa'
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.imageUrl = user.imageUrl;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.imageUrl = token.imageUrl as string;
        session.user.fullName = token.fullName as string | null;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
