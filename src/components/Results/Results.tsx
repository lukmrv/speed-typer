import resultsStyles from "@components/Results/Results.module.scss";

import useStore from "@store/store";
import Button from "@components/Button/Button";
import { PropsType } from "@pages/index";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateForward, faBookOpen } from "@fortawesome/free-solid-svg-icons";

import { Tooltip } from "@components/Tooltip/Tooltip";

const Results = (props: PropsType) => {
	const { setShowText, setIsTextFullView } = props;
	const {
		wordsArray,
		setWordsArray,
		setGameStatus,
		textLength,
		calculatedResults,
		resetResults,
	} = useStore();

	const restartGame = () => {
		setWordsArray({ textLength });
		setGameStatus("landed");
		setShowText(true);
		setIsTextFullView(false);
		resetResults();
	};

	return (
		<div className={classNames(resultsStyles["results-box"], "mb-8")}>
			<div className="flex w-full justify-center gap-10">
				<div className="flex flex-col gap-8 items-end">
					<div className="flex flex-col">
						<span className="text-base text-right">CHARS</span>
						<div className="flex text-3xl font-bold leading-none gap-1">
							<Tooltip label="total">
								<span>{calculatedResults.totalTextLength}</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="correct">
								<span style={{ color: "#9fadc6" }}>
									{calculatedResults.correctCharacters}
								</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="incorrect">
								<span style={{ color: "#c27070" }}>
									{calculatedResults.incorrectCharacters}
								</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="missed">
								<span>{calculatedResults.missedCharacters}</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="appended">
								<span style={{ color: "#c28b70" }}>
									{calculatedResults.appendedCharacters}
								</span>
							</Tooltip>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-base text-right">WORDS</span>
						<div className="flex text-3xl justify-end font-bold leading-none gap-1">
							<Tooltip label="total">
								<span>{wordsArray.length}</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="correct">
								<span style={{ color: "#9fadc6" }}>
									{wordsArray.length - calculatedResults.incorrectWords}
								</span>
							</Tooltip>

							<span className="opacity-30">/</span>

							<Tooltip label="incorrect">
								<span style={{ color: "#c27070" }}>
									{calculatedResults.incorrectWords}
								</span>
							</Tooltip>
						</div>
					</div>
					<div className="flex justify-end gap-8">
						<div className="flex flex-col">
							<span className="text-base text-right">ACCURACY</span>
							<div className="flex text-3xl justify-end font-bold leading-none">
								{calculatedResults.accuracy}%
							</div>
						</div>
						<div className="flex flex-col">
							<span className="text-base text-right">TIME</span>
							<div className="flex text-3xl justify-end font-bold leading-none">
								{Math.round(calculatedResults.seconds)}s
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start gap-8 desktop:pr-28">
					<div className="flex flex-col">
						<span className="text-base">CPM</span>
						<span className="text-7xl font-bold leading-none">
							{calculatedResults.CPM}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-base">WPM</span>
						<span className="text-7xl font-bold leading-none">
							{calculatedResults.WPM}
						</span>
					</div>
				</div>
			</div>

			<div className="flex justify-center gap-10 mt-12">
				<Tooltip label="play again">
					<FontAwesomeIcon
						className="max-h-6 cursor-pointer opacity-40 hover:opacity-100 transition-all"
						icon={faRotateForward}
						onClick={() => restartGame()}
					/>
				</Tooltip>
				<Tooltip label="show text ">
					<FontAwesomeIcon
						className="max-h-6 cursor-pointer opacity-40 hover:opacity-100 transition-all"
						icon={faBookOpen}
						onClick={() => setShowText((current) => !current)}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default Results;
