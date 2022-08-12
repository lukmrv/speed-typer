import create from "zustand";

import { createResultsSlice, ResultsStateType } from "./resultsSlice";
import { createTextSlice, TextStateType } from "./textSlice";
import { createPreferencesSlice, PreferencesStateType } from "./preferencesSlice";

type StateType = ResultsStateType & TextStateType & PreferencesStateType;

const useStore = create<StateType>((...set) => ({
	...createResultsSlice(...set),
	...createTextSlice(...set),
	...createPreferencesSlice(...set),
}));

export default useStore;
