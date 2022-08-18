import type { ResultsStateType } from "types/resultsTypes";

export const createResult = async (result: ResultsStateType) => {
	const response = await fetch(`/api/create_result`, {
		method: "POST",
		body: JSON.stringify({ result }),
	});

	if (!response.ok) {
		const responseMessage = await response.json();
		return responseMessage;
	}

	return await response.json();
};
