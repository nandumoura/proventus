import { useState, ReactNode } from "react";

const ButtonWithPopover = ({
  popoverText,
  children,
  isAlert,
}: {
  popoverText?: string;
  children: ReactNode;
  isAlert?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorMode = isAlert
    ? "text-red-500 hover:text-slate-50 p-2 my-2 hover:bg-red-300 bg-slate-100 shadow-md rounded"
    : "hover:bg-slate-200 p-1 rounded-md border-slate-500 border-2";
  const colorModeHover = "absolute left-0 bottom-full p-4 bg-slate-50 shadow";
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className={colorMode}>{children}</button>

      {isHovered && (
        <div className={colorModeHover}>
          <p>{popoverText}</p>
        </div>
      )}
    </div>
  );
};

export default ButtonWithPopover;
