import textBoxStyles from "@components/TextBox/TextBox.module.scss";

import { useEffect, useRef } from "react";
import classNames from "classnames";

import Button from "@components/Button/Button";
import useStore from "@store/store";
import { handleProgress } from "@components/TextBox/handleProgress";
import { PropsType } from "@pages/index";
import { Tooltip } from "@components/Tooltip/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateForward, faBookOpen } from "@fortawesome/free-solid-svg-icons";

type KeyboardEvent = {
	key: string;
	ctrlKey: boolean;
	metaKey: boolean;
};

const ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9.,():_ -]$/;
const LETTER_WIDTH = 14.41; // px

function TextBox(props: PropsType) {
	const { showText, setShowText, isTextFullView, setIsTextFullView } = props;

	const {
		wordsArray,
		typedWordsHistoryArray,
		typedFromCurrentWord,
		setWordsArray,
		textLength,
		setGameStatus,
		gameStatus,
		resetResults,
	} = useStore();

	const currentLocalWordRef = useRef<HTMLDivElement | null>(null);

	const extraLetters = typedFromCurrentWord
		.slice(wordsArray[typedWordsHistoryArray.length]?.length)
		.split("");

	const handleKeyDown = (e: KeyboardEvent) => {
		const isCharacter = ALLOWED_CHARACTERS_REGEX.test(e.key);
		const isBackspace = e.key === "Backspace";
		const isGameFinished = useStore.getState().gameStatus === "finished";

		if ((isCharacter || isBackspace) && !isGameFinished) {
			handleProgress(e.key, currentLocalWordRef, e.ctrlKey || e.metaKey);
		}
	};

	const restartGame = () => {
		setWordsArray({ textLength });
		setGameStatus("landed");
		setShowText(true);
		resetResults();
	};

	useEffect(() => {
		// initiage text through store
		if (gameStatus === "landed") {
			setWordsArray({ textLength });
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [setWordsArray, textLength, gameStatus]);

	return (
		<div
			className={classNames(textBoxStyles["textbox-wrapper"], {
				[textBoxStyles["textbox-wrapper--hidden"]]:
					gameStatus === "finished" ? showText : !showText,
			})}
			onClick={() => console.log(123)}
		>
			<div
				className={classNames("opacity-60 transition-all text-slate-700 text-lg mb-8", {
					"!opacity-20": gameStatus === "ongoing",
				})}
			>
				<span>{typedWordsHistoryArray.length}</span>
				<span>/</span>
				<span>{wordsArray.length}</span>
			</div>
			<div
				className={classNames(textBoxStyles["text-box"], {
					[textBoxStyles["text--full"]]:
						gameStatus === "finished" ? true : isTextFullView,
				})}
			>
				{wordsArray.map((word, wordIdx) => {
					const currentWordIdx = typedWordsHistoryArray.length;

					const isWordActive =
						wordsArray[currentWordIdx] === word && currentWordIdx === wordIdx;

					return (
						<div
							className={textBoxStyles["word"]}
							ref={isWordActive ? currentLocalWordRef : null}
							key={word + wordIdx}
						>
							{isWordActive ? (
								<div
									className={classNames(textBoxStyles["caret"], {
										[textBoxStyles["blink"]]:
											!typedFromCurrentWord.length &&
											!typedWordsHistoryArray.length,
									})}
									style={{
										left: typedFromCurrentWord.length * LETTER_WIDTH,
									}}
								></div>
							) : null}

							{/* main part of the word */}
							{word.split("").map((char, charId) => {
								return <span key={`${wordIdx}${charId}`}>{char}</span>;
							})}

							{/* appended part of the word */}
							{isWordActive
								? extraLetters.map((char, charId) => {
										return (
											<span
												key={char + charId}
												className={textBoxStyles["character--appended"]}
											>
												{char}
											</span>
										);
								  })
								: typedWordsHistoryArray?.[wordIdx]
										?.slice(wordsArray[wordIdx].length)
										.split("")
										.map((char, charId) => {
											return (
												<span
													key={char + charId}
													className={textBoxStyles["character--appended"]}
												>
													{char}
												</span>
											);
										})}
						</div>
					);
				})}
			</div>

			{gameStatus !== "finished" && (
				<div
					className={classNames("opacity-60 transition-all flex text-sm mt-8 gap-4", {
						"!opacity-20": gameStatus === "ongoing",
					})}
				>
					<Tooltip label="play again">
						<FontAwesomeIcon
							className="max-h-6 cursor-pointer text-slate-700"
							icon={faRotateForward}
							onClick={() => restartGame()}
						/>
					</Tooltip>
					<Tooltip label="show full text">
						<FontAwesomeIcon
							className="max-h-6 cursor-pointer text-slate-700"
							icon={faBookOpen}
							onClick={() => setIsTextFullView((current) => !current)}
						/>
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default TextBox;
