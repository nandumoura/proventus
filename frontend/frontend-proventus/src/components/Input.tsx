import { ChangeEvent } from "react";

interface Props {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  changeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, changeEvent, name, type = "text" }: Props) => {
  return (
    <div className="flex items-center text-gray-400 border rounded-md">
      <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={changeEvent}
        name={name}
        id={name}
        className="w-full p-2.5 ml-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default Input;
