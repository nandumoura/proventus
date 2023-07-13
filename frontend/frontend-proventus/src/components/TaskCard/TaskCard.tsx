import PlayIcon from "../../icons/Play";
import ButtonWithPopover from "../ButtonWithPopover";
import TrashIcon from "../../icons/trash";
import { useEffect, useState } from "react";
import Pause from "../../icons/Pause";
import { Task } from "../../types/typings";
import {
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} from "../../services/tasksApi";

const TaskCard = ({
  task,
  editMode,
  onReload,
}: {
  task: Task;
  editMode: boolean;
  onReload: () => void;
}) => {
  console.log("TaskCard loaded");
  const [miliseconds, setMiliseconds] = useState(0);
  const [paused, setPaused] = useState(true);
  const [updateTask] = useUpdateTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!paused) {
      intervalId = setInterval(() => {
        setMiliseconds((prevMiliseconds) => prevMiliseconds + 1000);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [paused]);

  const handleStartPauseTimer = () => {
    setPaused((prevPaused) => !prevPaused);
    console.log({ ...task, timeSpend: task.timeSpend + miliseconds });
    updateTask({ ...task, timeSpend: task.timeSpend + miliseconds });
  };
  const handleRemoveTask = async () => {
    await removeTask(task.key || "");
    onReload();
  };
  return (
    <div className="bg-slate-50 rounded-md shadow my-1 p-2 flex items-center justify-between">
      <p className="p-1 flex w-full justify-between items-center ">
        {task.title}{" "}
        <span
          className={`bg-slate-100 p-2 rounded-lg shadow-md ${
            !paused ? "text-red-500 font-bold" : "text-teal-600 font-semibold"
          }`}
        >
          {new Date(task.timeSpend + miliseconds)
            .toISOString()
            .substring(11, 19)}
        </span>
      </p>
      {!editMode ? (
        <ButtonWithPopover
          onClickPassed={handleStartPauseTimer}
          popoverText={paused ? "Start Timer" : "Pause timer"}
        >
          {paused ? <PlayIcon /> : <Pause />}
        </ButtonWithPopover>
      ) : (
        <ButtonWithPopover
          onClickPassed={handleRemoveTask}
          isAlert={true}
          popoverText="Remove Task"
        >
          <TrashIcon />
        </ButtonWithPopover>
      )}
    </div>
  );
};

export default TaskCard;
