import { RefObject } from "react";

import { calculateResults } from "@components/TextBox/calculateResults";
import useStore from "@store/store";
import { createResult } from "@services/fetchApiHelpers";
import router from "next/router";

import { getSession } from "next-auth/react";

const MAX_NUMBER_OF_APPENDED_CHARACTERS = 10;

export const handleProgress = (
	key: string,
	wordRef: RefObject<HTMLDivElement> | null,
	ctrlKey?: boolean
) => {
	const isBackspace = key === "Backspace";
	const isSpace = key === " ";
	const isValidCharacter = !isBackspace && !isSpace;

	const activeWordRef = wordRef?.current as HTMLDivElement;

	let {
		typedFromCurrentWord,
		wordsArray,
		typedWordsHistoryArray,
		currentWord,
		timeStop,
		timeStart,
		errorsTimestsmps,
		calculatedResults,
	} = useStore.getState();

	const unsubscribeStoreListener = useStore.subscribe(
		(currentStoreValue) =>
			({
				typedFromCurrentWord,
				wordsArray,
				typedWordsHistoryArray,
				currentWord,
				errorsTimestsmps,
			} = currentStoreValue)
	);

	// any valid char case
	if (isValidCharacter) {
		// begin game
		if (typedFromCurrentWord.length === 0 && typedWordsHistoryArray.length === 0) {
			useStore.setState({
				timeStart: performance.now(),
				gameStatus: "ongoing",
			});
		}

		if (typedFromCurrentWord.length - currentWord?.length < MAX_NUMBER_OF_APPENDED_CHARACTERS) {
			useStore.setState({
				typedFromCurrentWord: typedFromCurrentWord + key,
			});
		}
	}

	// spacebar case
	if (isSpace && typedFromCurrentWord.length > 0) {
		const nextSiblingElement = activeWordRef?.nextElementSibling as Element;
		nextSiblingElement?.scrollIntoView({ block: "center" });

		const isCurrentWordCorrect = typedFromCurrentWord === currentWord;

		if (!isCurrentWordCorrect) {
			activeWordRef.classList.add("word--incorrect");
		}

		activeWordRef.classList.add("word--finished");

		useStore.setState({
			typedWordsHistoryArray: [...typedWordsHistoryArray, typedFromCurrentWord],
			typedFromCurrentWord: "",
			currentWord: wordsArray[typedWordsHistoryArray.length + 1],
		});
	}

	// check for characters correcteness
	const isCharCorrect = activeWordRef?.children[typedFromCurrentWord.length]?.innerHTML === key;
	const activeCharElement = activeWordRef?.children[typedFromCurrentWord.length];

	if (isCharCorrect) {
		activeCharElement?.classList.add("character--correct");
	} else {
		// add incorrect stroke timestamp
		if (!isSpace && !isBackspace) {
			// console.log("incorrect", "-------");
			useStore.setState({
				errorsTimestsmps: [...errorsTimestsmps, performance.now()],
			});
		}

		activeCharElement?.classList.add("character--incorrect");
	}

	// backspace case + reset case
	if (isBackspace) {
		const isPrevWordCorrect =
			typedWordsHistoryArray.slice(-1)[0] === wordsArray[typedWordsHistoryArray.length - 1];
		const isTypedFromCurrentWordEmpty = typedFromCurrentWord.length === 0;
		const slicedCurretlyTypedWord = typedFromCurrentWord.slice(0, -1);

		// Backspace scenarios
		const isResetCurrentWord = !isTypedFromCurrentWordEmpty && ctrlKey;
		const isResetPreviousWord = isTypedFromCurrentWordEmpty && !isPrevWordCorrect && ctrlKey;
		const isGoToPreviousWord = isTypedFromCurrentWordEmpty && !isPrevWordCorrect && !ctrlKey;

		const previousSiblingElement = activeWordRef?.previousElementSibling as Element;

		// basic backspace scenario on the same word
		if (!ctrlKey) {
			useStore.setState({
				typedFromCurrentWord: slicedCurretlyTypedWord,
			});
			activeWordRef?.children?.[typedFromCurrentWord.length + 1]?.classList.remove(
				"character--incorrect",
				"character--correct"
			);
		}

		// jumpt to previous word, NO RESET
		if (isGoToPreviousWord) {
			previousSiblingElement?.scrollIntoView({
				block: "center",
			});

			previousSiblingElement?.classList.remove("word--incorrect", "word--finished");

			useStore.setState({
				typedFromCurrentWord: typedWordsHistoryArray.slice(-1)[0],
				typedWordsHistoryArray: [...typedWordsHistoryArray.slice(0, -1)],
				currentWordRef: wordRef,
				currentWord: wordsArray[typedWordsHistoryArray.length - 1],
			});
		}

		// jumpt to previous word, RESET
		if (isResetPreviousWord) {
			previousSiblingElement?.scrollIntoView({
				block: "center",
			});

			previousSiblingElement.classList.remove("word--incorrect", "word--finished");

			useStore.setState({
				typedFromCurrentWord: "",
				typedWordsHistoryArray: [...typedWordsHistoryArray.slice(0, -1)],
				currentWordRef: wordRef,
				currentWord: wordsArray[typedWordsHistoryArray.length - 1],
			});

			for (let i = 0; i < previousSiblingElement?.children.length; i++) {
				previousSiblingElement?.children[i].classList.remove(
					"character--incorrect",
					"character--correct"
				);
			}
		}

		// RESET currentWord
		if (isResetCurrentWord) {
			useStore.setState({
				typedFromCurrentWord: "",
			});

			for (let i = 0; i < activeWordRef?.children.length; i++) {
				activeWordRef?.children[i].classList.remove(
					"character--incorrect",
					"character--correct"
				);
			}
		}
	}

	// finish cases
	const isFinishedForced = isSpace && wordsArray.length <= typedWordsHistoryArray.length;
	const isFinishNatural = wordsArray.length - 1 === typedWordsHistoryArray.length;

	if (isFinishedForced) {
		const timeStop = performance.now();
		const calculatedResults = calculateResults(timeStop, [
			...typedWordsHistoryArray,
			typedFromCurrentWord,
		]);

		useStore.setState({
			timeStop,
			gameStatus: "finished",
			typedWordsHistoryArray: [...typedWordsHistoryArray, typedFromCurrentWord],
			calculatedResults,
		});

		getSession().then((sessionData) => {
			createResult({
				timeStop,
				timeStart,
				errorsTimestsmps,
				calculatedResults,
			})
				.then((response) => {
					if (response?.success) {
						console.log("all good, result written");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		});
	}
	if (isFinishNatural) {
		if (currentWord === typedFromCurrentWord) {
			useStore.setState({
				timeStop: performance.now(),
				gameStatus: "finished",
				typedWordsHistoryArray: [...typedWordsHistoryArray, typedFromCurrentWord],
				calculatedResults: calculateResults(performance.now(), [
					...typedWordsHistoryArray,
					typedFromCurrentWord,
				]),
			});
		}
	}

	unsubscribeStoreListener();
};
