import create from "zustand";

import { createResultsSlice } from "./resultsSlice";
import { createTextSlice } from "./textSlice";
import { createPreferencesSlice } from "./preferencesSlice";
import { TextSliceType } from "types/textTypes";
import { ResultsSliceType } from "types/resultsTypes";
import { PreferencesStateType } from "types/preferencesTypes";

type StateType = ResultsSliceType & TextSliceType & PreferencesStateType;

const useStore = create<StateType>((...set) => ({
	...createResultsSlice(...set),
	...createTextSlice(...set),
	...createPreferencesSlice(...set),
}));

export default useStore;
