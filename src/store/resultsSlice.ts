import { GameStatusTypes, ResultsSliceType } from "types/resultsTypes";
import { StateCreator } from "zustand";

const initialCalculatedResults = {
	incorrectWords: 0,
	incorrectCharacters: 0,
	appendedCharacters: 0,
	missedCharacters: 0,
	accuracy: 0,
	seconds: 0,
	CPM: 0,
	WPM: 0,
	totalTextLength: 0,
	correctCharacters: 0,
};

const initialResultsState = {
	timeStart: 0,
	timeStop: 0,
	errorsTimestamps: [],
	gameStatus: "landed" as GameStatusTypes,
	calculatedResults: initialCalculatedResults,

	setGameStatus: () => {},
	resetResults: () => {},
};

export const createResultsSlice: StateCreator<ResultsSliceType> = (set) => ({
	...initialResultsState,
	setGameStatus: (payload) => set(() => ({ timeStart: 0, timeStop: 0, gameStatus: payload })),
	resetResults: () =>
		set(() => ({
			timeStart: 0,
			timeStop: 0,
			errorsTimestamps: [],
			gameStatus: "landed",
			calculatedResults: initialCalculatedResults,
		})),
});
