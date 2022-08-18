import { StateCreator } from "zustand";

import { LOCAL_STORAGE_TEXT_LENGTH } from "@components/TextControls/TextControls";
import { PreferencesStateType } from "types/preferencesTypes";

const getTextLengthValue = () => {
	const initialTextLength = 5;
	if (typeof window !== "undefined") {
		return +localStorage.getItem(LOCAL_STORAGE_TEXT_LENGTH)! || initialTextLength;
	}
	return initialTextLength;
};

const initialPreferencesState: PreferencesStateType = {
	textLength: getTextLengthValue(),
	colorTheme: "",

	setTextLength: () => {},
};

export const createPreferencesSlice: StateCreator<PreferencesStateType> = (set) => ({
	...initialPreferencesState,
	setTextLength: (payload) => set(() => ({ textLength: payload })),
});
