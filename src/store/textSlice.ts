import { RefObject } from "react";
import { StateCreator } from "zustand";
import words from "@components/TextBox/words.json";
import { TextSliceType } from "types/textTypes";

const initialTextState = {
	wordsArray: [],
	typedWordsHistoryArray: [],

	currentWord: "",
	typedFromCurrentWord: "",

	currentWordRef: null,

	setWordsArray: () => {},
};

export const createTextSlice: StateCreator<TextSliceType> = (set) => ({
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
