type GameStatusTypes = "landed" | "ongoing" | "finished";

type CalculatedResultsType = {
	incorrectWords: number;
	incorrectCharacters: number;
	appendedCharacters: number;
	missedCharacters: number;
	accuracy: number;
	seconds: number;
	CPM: number;
	WPM: number;
	totalTextLength: number;
	correctCharacters: number;
};

export type ResultsStateType = {
	timeStart: number;
	timeStop: number;
	errorsTimestsmps: number[];
	gameStatus?: GameStatusTypes;
	calculatedResults: CalculatedResultsType;
};

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
