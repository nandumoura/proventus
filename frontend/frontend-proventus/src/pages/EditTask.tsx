import { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useUpdateTaskMutation,
  useGetTasksByProjectIdQuery,
} from "../services/tasksApi";
import { Task } from "../types/typings";

const EditTask = () => {
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const { data: tasks, refetch: tasksRefetch } =
    useGetTasksByProjectIdQuery(projectId);
  const [updateTask] = useUpdateTaskMutation();
  const task = tasks?.find((task) => task.key === taskId);

  const resetState = () => {
    return {
      description: task?.description || "",
      projectId: projectId || "not found",
      timeSpend: task?.timeSpend || 0,
      title: task?.title || "",
    };
  };

  const [formState, setFormState] = useState<Task>(resetState());

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // the code below change string to number case field is estimatedTime

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function handleClick() {
    //todo utilizar updateTask
    // await addTask({ task: formState, projectId: projectId || "not found" });
    await updateTask(formState);
    await tasksRefetch();
    navigate(`/project/${projectId}`);
  }

  useEffect(() => {
    setFormState((prevState) => {
      if (task) {
        return task;
      } else {
        return prevState;
      }
    });
  }, [projectId, task]);
  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Edit Task </h1>
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
          Edit Task
        </button>
      </div>
    </section>
  );
};

export default EditTask;
