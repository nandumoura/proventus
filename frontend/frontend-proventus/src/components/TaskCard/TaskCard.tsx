import { useCallback, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
//components
import TrashIcon from "../../icons/trash";
import PlayIcon from "../../icons/Play";
import Pause from "../../icons/Pause";
import ButtonWithPopover from "../ButtonWithPopover";
//typings
import { Task } from "../../types/typings";
//services
import {
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} from "../../services/tasksApi";

export interface TaskCardProps {
  task: Task;
  editMode: boolean;
  onReload: () => void;
}

const TaskCard = ({ task, editMode, onReload }: TaskCardProps) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(task.timeSpend);

  const [updateTask] = useUpdateTaskMutation();
  const [removeTask] = useRemoveTaskMutation();
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (startTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime + task.timeSpend);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, task.timeSpend]);

  const handleStartPauseTimer = useCallback(async () => {
    if (startTime) {
      await updateTask({
        ...task,
        timeSpend: task.timeSpend + (Date.now() - startTime),
      });
      onReload();
      setStartTime(null); // Pausar o timer
    } else {
      setStartTime(Date.now()); // Iniciar o timer
    }
  }, [startTime, onReload, task, updateTask]);

  const handleRemoveTask = useCallback(async () => {
    await removeTask(task.key || "");
    onReload();
  }, [task.key, removeTask, onReload]);

  return (
    <div className="bg-slate-50 rounded-md shadow my-1 p-2 flex items-center justify-between">
      <div className="flex flex-wrap  w-full justify-between items-center">
        <p className="p-1 flex w-3/5  truncate ... text-ellipsis overflow-hidden">
          <Link to={`/project/${task.projectId}/edittask/${task.key}`}>
            {task.title}
          </Link>
        </p>
        <span
          className={`bg-slate-100 p-2 rounded-lg shadow-md ${
            startTime ? "text-red-500 font-bold" : "text-teal-600 font-semibold"
          }`}
        >
          {new Date(elapsedTime).toISOString().substring(11, 19)}
        </span>
        {!editMode ? (
          <ButtonWithPopover
            onClickPassed={handleStartPauseTimer}
            popoverText={startTime ? "Start Timer" : "Pause timer"}
          >
            {!startTime ? <PlayIcon /> : <Pause />}
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
    </div>
  );
};
const TaskWithMemo = memo(TaskCard);
export default TaskWithMemo;
