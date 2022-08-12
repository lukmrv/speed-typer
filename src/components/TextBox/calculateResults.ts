import useStore from "@store/store";

type CollecterResultsType = {
	incorrectWords: number;
	incorrectCharacters: number;
	appendedCharacters: number;
	missedCharacters: number;
};

const calculateCPM = (timeOne: number, timeTwo: number, length: number): number => {
	const deltaInMilliseconds = timeTwo - timeOne;
	const seconds = deltaInMilliseconds / 1000;
	const CPM = seconds ? Math.round(+(length / seconds).toFixed(1) * 60) : 0;
	return CPM;
};

export const calculateResults = (timeStop: number, wordsHistory: string[]) => {
	let { timeStart, wordsArray, errorsTimestsmps } = useStore.getState();

	const totalTextLength = wordsArray.reduce((acc, element) => (acc += element.length), 0);

	const deltaInMilliseconds = timeStop - timeStart;
	const seconds = deltaInMilliseconds / 1000;

	const CPM = calculateCPM(timeStart, timeStop, totalTextLength + wordsArray.length - 1);
	const WPM = Math.round(CPM / 5); // just as monkeytype does

	const incorrectNumberByTypes = wordsArray.reduce(
		(acc: CollecterResultsType, word, wordIdx) => {
			const typedWord = wordsHistory[wordIdx];
			const higherLengthString = typedWord?.length >= word?.length ? typedWord : word;
			const lowerLengthString = typedWord?.length < word?.length ? typedWord : word;
			const higherLengthWordCharactersArray = higherLengthString.split("");
			const isWordIncorrect = word !== wordsHistory[wordIdx];

			if (isWordIncorrect) {
				acc = { ...acc, incorrectWords: (acc.incorrectWords += 1) };
			}

			higherLengthWordCharactersArray.forEach((char, charIdx) => {
				const isInWordBound = charIdx < word.length;
				const isCharUndefined = lowerLengthString?.[charIdx] === undefined;
				const isCharCorrect = char === lowerLengthString?.[charIdx];

				const isLetterAppended = !isInWordBound;
				const isLetterMissed = isCharUndefined && isInWordBound;
				const isLetterIncorrect = !isCharCorrect && isInWordBound && !isCharUndefined;

				if (isLetterAppended) {
					acc = { ...acc, appendedCharacters: (acc.appendedCharacters += 1) };
				}
				if (isLetterMissed) {
					acc = { ...acc, missedCharacters: (acc.missedCharacters += 1) };
				}
				if (isLetterIncorrect) {
					acc = { ...acc, incorrectCharacters: (acc.incorrectCharacters += 1) };
				}
			});

			return acc;
		},
		{
			incorrectWords: 0,
			incorrectCharacters: 0,
			appendedCharacters: 0,
			missedCharacters: 0,
		}
	);

	const correctCharacters =
		totalTextLength -
		incorrectNumberByTypes?.incorrectCharacters -
		incorrectNumberByTypes?.missedCharacters;

	const accuracy = Math.floor(
		((correctCharacters - errorsTimestsmps.length) / totalTextLength) * 100
	);

	return {
		accuracy,
		seconds,
		CPM,
		WPM,
		totalTextLength,
		correctCharacters,
		...incorrectNumberByTypes,
	};
};
