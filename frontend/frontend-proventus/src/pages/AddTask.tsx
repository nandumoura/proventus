import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import { useParams, useNavigate } from "react-router-dom";
import { useAddTaskMutation } from "../services/tasksApi";
import { Task } from "../types/typings";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const resetState = () => {
    return {
      description: "",
      projectId: projectId || "not found",
      timeSpend: 0,
      title: "",
    };
  };
  const [formState, setFormState] = useState<Task>(resetState());
  const [addTask] = useAddTaskMutation();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // the code below change string to number case field is estimatedTime

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function handleClick() {
    await addTask({ task: formState, projectId: projectId || "not found" });
    navigate(`/project/${projectId}`);
    window.location.reload();
  }
  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Add Task </h1>
      </div>
      <div className=" bg-white max-w-3xl p-8 shadow-md space-y-4  mt-4">
        <Input
          value={formState.title}
          changeEvent={handleInputChange}
          label="Title"
          name="title"
          placeholder="task title here..."
        />
        <Input
          value={formState.description}
          changeEvent={handleInputChange}
          label="Description"
          name="description"
          placeholder=""
        />

        <button
          onClick={handleClick}
          className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg"
        >
          Add Task
        </button>
      </div>
    </section>
  );
};

export default AddTaskPage;
