export type PreferencesStateType = {
	textLength: number;
	colorTheme: string;

	setTextLength: (payload: number) => void;
};

export type PreferencesSliceType =
	| PreferencesStateType & {
			setTextLength: () => {};
	  };
