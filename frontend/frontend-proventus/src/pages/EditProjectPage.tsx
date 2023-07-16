import { ChangeEvent, useEffect, useState } from "react";
// utils
import { parseNumber } from "../utils/utils";
// services
import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../services/projectsApi";
//components
import InputTimer from "../components/InputTimer";
import Input from "../components/Input";
//libs
import { useNavigate, useParams } from "react-router-dom";

// todo encaminhar para pagina de projetos

const CreateProject = () => {
  const { projectKey } = useParams();
  const { data: projects = [], refetch } = useGetProjectsQuery("projects");
  const [updateProject] = useUpdateProjectMutation();
  const project = projects.find((project) => project.key === projectKey);

  const navigate = useNavigate();
  const [resetTimer, setResetTimer] = useState(false);

  const [timerInMiliseconds, setTimerInMiliseconds] = useState(0);
  // function to reset
  const resetState = () => {
    return {
      name: "",
      description: "",
      estimatedTime: 0,
      elapsedTime: 0,
    };
  };

  const [formState, setFormState] = useState(resetState());

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // the code below change string to number case field is estimatedTime
    const newValue = name === "estimatedTime" ? parseNumber(value) : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    setFormState(project || resetState);
  }, [project]);
  // handle click create new project
  async function handleUpdateProject() {
    await updateProject(formState);
    await refetch();
    navigate("/");
  }

  useEffect(() => {
    setResetTimer(false);
  }, [resetTimer]);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      estimatedTime: timerInMiliseconds,
    }));
  }, [timerInMiliseconds]);

  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Create Project Page </h1>
      </div>

      <div className=" bg-white max-w-3xl p-8 shadow-md space-y-4  mt-4">
        <Input
          value={formState.name}
          changeEvent={handleInputChange}
          label="Name"
          name="name"
          placeholder=""
        />
        <Input
          value={formState.description}
          changeEvent={handleInputChange}
          label="Description"
          name="description"
          placeholder=""
        />

        <InputTimer
          timerState={setTimerInMiliseconds}
          isTimeToReset={resetTimer}
        />
        <button
          onClick={handleUpdateProject}
          className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg"
        >
          Save Project
        </button>
      </div>
    </section>
  );
};

export default CreateProject;
