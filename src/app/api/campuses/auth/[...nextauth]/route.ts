import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../../../core/infrastructure/db/client/index';
import { users } from '../../../../core/infrastructure/db/schema/users';
import { eq } from 'drizzle-orm';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        const user = result[0];
        if (!user) return null;

        // Pour la démo — on accepte n'importe quel mot de passe
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'plateforme-campus-secret-dev',
});

export { handler as GET, handler as POST };