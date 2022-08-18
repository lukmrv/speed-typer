import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			image: any;
			email: any;
			name: any;
			id: string;
		};
	}
}

declare global {
	var prisma: PrismaClient | undefined;
}
