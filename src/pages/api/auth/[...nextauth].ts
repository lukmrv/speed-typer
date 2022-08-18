import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/databases
	//
	// Notes:
	// * You must install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	// database: process.env.DATABASE_URL,

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: process.env.GITHUB_SECRET,

	// session: {
	// 	// Use JSON Web Tokens for session instead of database sessions.
	// 	// This option can be used with or without a database for users/accounts.
	// 	// Note: `strategy` should be set to 'jwt' if no database is used.
	// 	// strategy: "jwt",
	// 	// Seconds - How long until an idle session expires and is no longer valid.
	// 	// maxAge: 12 * 60 * 60, // 12 days
	// 	// Seconds - Throttle how frequently to write to database to extend a session.
	// 	// Use it to limit write operations. Set to 0 to always update the database.
	// 	// Note: This option is ignored if using JSON Web Tokens
	// 	// updateAge: 24 * 60 * 60, // 24 hours
	// },

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// async signIn({ user, account, profile, email, credentials }) { return true },
		// async redirect({ url, baseUrl }) { return baseUrl },
		// async session({ session, token, user }) { return session },
		// async jwt({ token, user, account, profile, isNewUser }) { return token }

		async session({ session, user }) {
			return { ...session, user: { ...session.user, id: user.id } };
		},
	},
});
