import { useState } from "react";
import PlayIcon from "../../icons/Play";

const TaskCard = ({ name, editMode }: { name: string; editMode: boolean }) => {
  return (
    <div className="bg-slate-50 rounded-md shadow my-1 p-2 flex justify-between">
      <p className="p-2 ">{name} </p>
      <PlayBtn editMode={editMode} popoverText="Começar a contabilizar tempo" />
    </div>
  );
};

const PlayBtn = ({
  popoverText,
  editMode,
}: {
  popoverText?: string;
  editMode: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editMode ? (
        <button className="hover:bg-slate-200 p-1 rounded-md border-slate-500 border-2">
          <PlayIcon />
        </button>
      ) : (
        <>excluir</>
      )}
      {isHovered && (
        <div className="absolute left-0 bottom-full p-4 bg-slate-50 shadow">
          <p>{popoverText}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
