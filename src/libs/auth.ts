// libs/auth.ts
import { prisma } from "@/libs/prismaDb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { authenticateUser } from '../lib/auth-helpers';

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"] & {
      business?: {
        id: string;
        name: string;
        vt_use_scenario: string;
      };
      supabaseAccessToken?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Jhondoe" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // First try Supabase authentication
        try {
          const { user: supabaseUser, supabaseSession, error } = await authenticateUser(
            credentials.email,
            credentials.password
          );

          if (supabaseUser && !error) {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            return {
              ...user,
              supabaseAccessToken: supabaseSession?.access_token
            };
          }
        } catch (error) {
          console.error("Supabase auth error:", error);
        }

        // Fall back to regular authentication if Supabase fails
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),

    CredentialsProvider({
      name: "impersonate",
      id: "impersonate",
      credentials: {
        adminEmail: {
          label: "Admin Email",
          type: "text",
          placeholder: "Jhondoe@gmail.com",
        },
        userEmail: {
          label: "User Email",
          type: "text",
          placeholder: "Jhondoe@gmail.com",
        },
      },

      async authorize(credentials) {
        if (!credentials?.adminEmail || !credentials?.userEmail) {
          throw new Error("User email or Admin email is missing");
        }

        const admin = await prisma.user.findUnique({
          where: {
            email: credentials.adminEmail.toLowerCase(),
          },
        });

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.userEmail.toLowerCase(),
          },
        });

        if (!admin || admin.role !== "ADMIN") {
          throw new Error("Access denied");
        }

        if (!user) {
          throw new Error("No user found");
        }
        return user;
      },
    }),

    CredentialsProvider({
      name: "fetchSession",
      id: "fetchSession",
      credentials: {
        email: {
          label: "User Email",
          type: "text",
          placeholder: "Jhondoe@gmail.com",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("User email is missing");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });

        if (!user) {
          throw new Error("No user found");
        }
        return user;
      },
    }),

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    jwt: async (payload: any) => {
      const { token, trigger, session } = payload;
      const user: User = payload.user;

      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
          picture: session.user.image,
          image: session.user.image,
          priceId: session.user.priceId,
          currentPeriodEnd: session.user.currentPeriodEnd,
          subscriptionId: session.user.subscriptionId,
          customerId: session.user.customerId,
          business: session.user.business,
          supabaseAccessToken: session.user.supabaseAccessToken
        };
      }

      if (user) {
        const business = await prisma.business.findFirst({
          where: {
            ownerId: user.id
          },
          select: {
            id: true,
            name: true,
            vt_use_scenario: true,
          }
        });

        return {
          ...token,
          uid: user.id,
          priceId: user.priceId,
          currentPeriodEnd: user.currentPeriodEnd,
          subscriptionId: user.subscriptionId,
          role: user.role,
          picture: user.image,
          image: user.image,
          business: business,
          supabaseAccessToken: user.supabaseAccessToken
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            priceId: token.priceId,
            currentPeriodEnd: token.currentPeriodEnd,
            subscriptionId: token.subscriptionId,
            role: token.role,
            image: token.picture,
            business: token.business,
            supabaseAccessToken: token.supabaseAccessToken
          },
        };
      }
      return session;
    },
  },
};

export const getAuthSession = async () => {
  return getServerSession(authOptions);
};