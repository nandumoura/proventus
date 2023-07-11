import { convertToTimer } from "../utils/utils";
interface Props {
  timer: number;
}

const ViewTimer = ({ timer }: Props) => {
  const timerNormalized = convertToTimer(timer);

  return (
    <div>
      {timerNormalized.months} months {timerNormalized.days} days{" "}
      {timerNormalized.hours} hours    {timerNormalized.minutes} minutes
    </div>
  );
};

export default ViewTimer;
