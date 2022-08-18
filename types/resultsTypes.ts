export type GameStatusTypes = "landed" | "ongoing" | "finished";

export type CalculatedResultsType = {
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
	errorsTimestamps: number[];
	gameStatus?: GameStatusTypes;
	calculatedResults: CalculatedResultsType;
};

export type ResultsSliceType =
	| ResultsStateType & {
			setGameStatus: (payload: GameStatusTypes) => void;
			resetResults: () => void;
	  };
