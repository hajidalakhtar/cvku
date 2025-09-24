import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '@/modules/Users/User.model';
import withPromise from '@/packages/libs/Asynchronous/withPromise';

const config = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
        const email = typeof credentials?.email === 'string' ? credentials.email : undefined;
        const password = typeof credentials?.password === 'string' ? credentials.password : undefined;

        if (!email || !password) {
          return null;
        }

        const [error, users] = await withPromise(() => UserModel.findByEmail(email));
        if (withPromise.isError(error)) {
          return null;
        }

        if (!users || users.length === 0) {
          return null;
        }

        const user = users[0]; // Get the first user from the array

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        // Return user object that matches NextAuth User type
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // session.user.role = token.role;
      }

      const customAccessToken = jwt.sign(
        session.user,
        process.env.AUTH_SECRET as string
      );

      return {
        ...session,
        access_token: customAccessToken
      };
    }
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
