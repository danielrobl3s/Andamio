import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client';
import { bearer } from 'better-auth/plugins/bearer';

const prisma = new PrismaClient();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    trustedOrigins: [
        process.env.BETTER_AUTH_URL!, 
        "http://localhost:3001", 
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    plugins: [
        bearer()
    ],
    advanced: {
        crossSubdomainCookies: {
            enabled: false,
        },
        defaultCookieAttributes: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        }
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