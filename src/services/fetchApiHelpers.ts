type User = string;

export interface Results {
	CPM: number;
	WPM: number;
	time: number;
}

export const createUser = async (user_id: User) => {
	const response = await fetch(`/api/create_user`, {
		method: "POST",
		body: user_id,
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
};

export const createResult = async (user_id: string, results: Results) => {
	const response = await fetch(`/api/${user_id}`, {
		method: "POST",
		body: JSON.stringify({ results, user_id }),
	});

	if (!response.ok) {
		const responseMessage = await response.json();
		return responseMessage;
	}

	return await response.json();
};
