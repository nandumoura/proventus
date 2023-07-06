import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {addProject} from "../features/projects/projectsSlice";
import { v4 as uuidv4 } from 'uuid';


const CreateProject = () => {
  const projects = useAppSelector(state=>state.project)
  const dispatch = useAppDispatch()

  const [formState, setFormState] = useState({
    key: "project-"+uuidv4(),
    name: "",
    description: "",
    estimatedTime: 0,
    elapsedTime: 0
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleClick(){
    dispatch(addProject({
      project: formState
    }))
  }

  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Create Project Page</h1>
      </div>
      <div className=" bg-white max-w-lg p-8 shadow-md space-y-4  mt-4">
        <Input
          changeEvent={handleInputChange}
          label="Name"
          name="name"
          placeholder=""
        />
        <Input
          changeEvent={handleInputChange}
          label="Description"
          name="description"
          placeholder=""
        />
        <Input
          type="number"
          changeEvent={handleInputChange}
          label="Estimated time"
          name="estimatedTime"
          placeholder=""
        />
        <button onClick={handleClick} className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg">
          Add Project
        </button>
      </div>
    </section>
  );
};

export default CreateProject;