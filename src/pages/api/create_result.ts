import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// initialte action / response when hitting API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		return await writeResult(req, res);
	}

	// if (req.method === "GET") {
	// 	return await getPollQuestion(req, res);
	// }

	return res.status(405).json({ message: "Method not allowed", success: false });
}

// add vote to a specific question
const writeResult = async (req: NextApiRequest, res: NextApiResponse) => {
	const { result } = JSON.parse(req.body);
	const session = await getSession({ req });

	console.log("-------------------------------------------------", session);

	try {
		const createResult = await prisma.result.create({
			data: {
				...result,
				User: {
					connect: {
						id: session?.user?.id,
					},
				},
			},
		});

		return res.status(200).json({ createResult, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
};
