import { useState } from "react";

export type TimeObjectType = {
	timeStart: number;
	timeStop: number;
};
export type StopWatchType = {
	time: TimeObjectType;
	timeStart(): void;
	timeStop(): void;
	resetTime(): void;
};

const useStopwatch = () => {
	const initialTimeState = { timeStart: 0, timeStop: 0 };
	const [time, setTime] = useState<TimeObjectType>(initialTimeState);

	const timeStart = () =>
		setTime((currentTimeState) => ({ ...currentTimeState, timeStart: Date.now() }));
	const timeStop = () =>
		setTime((currentTimeState) => ({ ...currentTimeState, timeStop: Date.now() }));
	const resetTime = () => setTime(initialTimeState);

	const STOPWATCH: StopWatchType = {
		time,
		timeStart,
		timeStop,
		resetTime,
	};

	return STOPWATCH;
};

export default useStopwatch;
