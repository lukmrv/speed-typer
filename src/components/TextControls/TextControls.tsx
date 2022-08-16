import textControlsStyles from "@components/TextControls/TextControls.module.scss";
import React from "react";

import useStore from "@store/store";
import classNames from "classnames";

export const LOCAL_STORAGE_TEXT_LENGTH = "TYPI_TYPE_TEXT_LENGTH";

const TextControls = () => {
	const { textLength, setTextLength } = useStore();

	const textLengthOptions = [5, 10, 25, 36, 80]; // number of words

	const setAndSaveToLocalStorage = (textLength: number) => {
		setTextLength(textLength);

		if (typeof window !== "undefined") {
			return +localStorage.setItem(LOCAL_STORAGE_TEXT_LENGTH, String(textLength));
		}
		return textLength;
	};

	return (
		<div className="flex items-center gap-4">
			<div className="flex gap-2">
				{textLengthOptions.map((textLengthOption) => (
					<button
						key={textLengthOption}
						className={classNames(textControlsStyles["option"], {
							"bg-slate-500 hover:bg-slate-400": textLength === textLengthOption,
						})}
						onClick={() => setAndSaveToLocalStorage(textLengthOption)}
					>
						{textLengthOption}
					</button>
				))}
			</div>
		</div>
	);
};

export default TextControls;
