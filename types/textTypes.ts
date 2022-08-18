import { RefObject } from "react";

export type TextStateType = {
	wordsArray: string[];
	typedWordsHistoryArray: string[];

	currentWord: string;
	typedFromCurrentWord: string;

	currentWordRef: RefObject<HTMLDivElement> | null;
};

export type TextSliceType =
	| TextStateType & {
			setWordsArray: (payload: { textLength: number }) => void;
	  };
