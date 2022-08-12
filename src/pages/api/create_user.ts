import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// initialte action / response when hitting API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		return await createUser(req, res);
	}

	return res.status(405).json({ message: "Method not allowed", success: false });
}

// post question do DB
const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const user_id = req.body;

	// console.log("user_id", user_id);

	try {
		const newUser = await prisma.user.create({
			data: {
				user_id,
			},
		});

		return res.status(200).json({ newUser, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
};
