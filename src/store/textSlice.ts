import { RefObject } from "react";
import { StateCreator } from "zustand";
import words from "@components/TextBox/words.json";

import store from "@store/store";

export type TextStateType = {
	wordsArray: string[];
	typedWordsHistoryArray: string[];

	currentWord: string;
	typedFromCurrentWord: string;

	currentWordRef: RefObject<HTMLDivElement> | null;

	setWordsArray: (payload: { textLength: number }) => void;
};

const initialTextState = {
	wordsArray: [],
	typedWordsHistoryArray: [],

	currentWord: "",
	typedFromCurrentWord: "",

	currentWordRef: null,

	setWordsArray: () => {},
};

export const createTextSlice: StateCreator<TextStateType> = (set) => ({
	...initialTextState,

	setWordsArray: (payload) => {
		const randomWordsArray: string[] = [];

		for (let i = 0; i < payload.textLength; i++) {
			randomWordsArray.push(words[Math.floor(Math.random() * words.length)]);
		}

		set(() => ({
			typedWordsHistoryArray: [],
			typedFromCurrentWord: "",
			currentWordRef: null,

			wordsArray: randomWordsArray,
			currentWord: randomWordsArray[0],
		}));
	},
});
