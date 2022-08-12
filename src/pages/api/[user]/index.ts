import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { user_id, results } = JSON.parse(req.body);

	if (req.method === "POST") {
		return await addResult(req, res);
	}

	return res.status(405).json({ message: "Method not allowed", success: false });
}

const addResult = async (req: NextApiRequest, res: NextApiResponse) => {
	const { user_id, results } = JSON.parse(req.body);

	try {
		const createVote = await prisma.result.create({
			data: {
				user_id: user_id,
				results: results,
			},
		});

		return res.status(200).json({ createVote, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
};
