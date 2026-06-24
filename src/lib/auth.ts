import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://localhost:5173",
        "https://andamio-frontend.vercel.app",
        "https://www.andamio-frontend.vercel.app",
        "https://im4ps.com",
        "https://www.im4ps.com"
    ],
    plugins: [
        
    ],
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: ".im4ps.com",
        },

        useSecureCookies: true,

        defaultCookieAttributes: {
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
            path: "/",
        },
    },
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    }
});