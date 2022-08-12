import { StateCreator } from "zustand";

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
	gameStatus: GameStatusTypes;
	calculatedResults: CalculatedResultsType;

	setGameStatus: (payload: GameStatusTypes) => void;
	resetResults: () => void;
};

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
	errorsTimestsmps: [],
	gameStatus: "landed" as GameStatusTypes,
	calculatedResults: initialCalculatedResults,

	setGameStatus: () => {},
	resetResults: () => {},
};

export const createResultsSlice: StateCreator<ResultsStateType> = (set) => ({
	...initialResultsState,
	setGameStatus: (payload) => set(() => ({ timeStart: 0, timeStop: 0, gameStatus: payload })),
	resetResults: () =>
		set(() => ({
			timeStart: 0,
			timeStop: 0,
			errorsTimestsmps: [],
			gameStatus: "landed",
			calculatedResults: initialCalculatedResults,
		})),
});
