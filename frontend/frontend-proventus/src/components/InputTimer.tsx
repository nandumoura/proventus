import { ChangeEvent, useState, useEffect } from "react";
import { Timer } from "../types/typings";
import { calculateMilliseconds } from "../utils/utils";

interface Props {
  timerState: (value: number) => void;
  isTimeToReset: boolean;
}

const resetTimer = () => {
  return {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    months: 0,
  };
};

const InputTimer = ({ timerState, isTimeToReset }: Props) => {
  const [timer, setTimer] = useState<Timer>(resetTimer());

  const inputClassNames =
    "w-full text-center  p-1 ml-1 bg-transparent outline-none";
  const inputBoxClassNames = "w-full flex flex-col items-center";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = Number(value);

    setTimer((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const validateAndSetTimer = (updatedTimer: Timer) => {
    if (updatedTimer.days > 31) {
      updatedTimer.days = 31;
    }
    if (updatedTimer.days < 0) {
      updatedTimer.days = 0;
    }

    if (updatedTimer.minutes > 59) {
      updatedTimer.minutes = 59;
    }
    if (updatedTimer.minutes < 0) {
      updatedTimer.minutes = 0;
    }

    if (updatedTimer.hours > 23) {
      updatedTimer.hours = 23;
    }

    if (updatedTimer.months < 0) {
      updatedTimer.months = 0;
    }

    setTimer(updatedTimer);
  };

  useEffect(() => {
    validateAndSetTimer(timer);
  }, [timer]);

  useEffect(() => {
    if (isTimeToReset) {
      setTimer(resetTimer());
    }
  }, [isTimeToReset]);

  useEffect(() => {
    timerState(calculateMilliseconds(timer));
  }, [timer]);

  return (
    <div className="flex justify-center items-center text-gray-400 border rounded-md">
      <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
        Estimated time
      </div>
      <div className={inputBoxClassNames}>
        <label>Months</label>
        <input
          type="number"
          onChange={handleInputChange}
          value={timer.months}
          name="months"
          min="0"
          id="months"
          className={inputClassNames}
        />
      </div>
      <div className={inputBoxClassNames}>
        <label>Days</label>
        <input
          type="number"
          onChange={handleInputChange}
          value={timer.days}
          name="days"
          max="31"
          min="0"
          id="days"
          className={inputClassNames}
        />
      </div>

      <div className={inputBoxClassNames}>
        <label>Hours</label>
        <input
          type="number"
          onChange={handleInputChange}
          value={timer.hours}
          name="hours"
          id="hours"
          max="23"
          min="0"
          className={inputClassNames}
        />
      </div>

      <div className={inputBoxClassNames}>
        <label>Minutes</label>
        <input
          type="number"
          onChange={handleInputChange}
          value={timer.minutes}
          name="minutes"
          min="0"
          max="59"
          id="minutes"
          className={inputClassNames}
        />
      </div>
    </div>
  );
};

export default InputTimer;
