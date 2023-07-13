import PlayIcon from "../../icons/Play";
import ButtonWithPopover from "../ButtonWithPopover";
import TrashIcon from "../../icons/trash";

const TaskCard = ({ name, editMode }: { name: string; editMode: boolean }) => {
  return (
    <div className="bg-slate-50 rounded-md shadow my-1 p-2 flex justify-between">
      <p className="p-2 ">{name} </p>
      {!editMode ? (
        <ButtonWithPopover popoverText="Start timer">
          <PlayIcon />
        </ButtonWithPopover>
      ) : (
        <ButtonWithPopover isAlert={true} popoverText="Remove Task">
          <TrashIcon />
        </ButtonWithPopover>
      )}
    </div>
  );
};

export default TaskCard;
