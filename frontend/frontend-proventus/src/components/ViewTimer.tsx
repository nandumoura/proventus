import { convertToTimer } from "../utils/utils";
interface Props {
  timer: number;
}

const ViewTimer = ({ timer }: Props) => {
  const timerNormalized = convertToTimer(timer);

  return (
    <div>
      {timerNormalized.months} M {timerNormalized.days} D{" "}
      Hours: {timerNormalized.hours} H {timerNormalized.minutes} min 
    </div>
  );
};

export default ViewTimer;
