import { ChangeEvent, useEffect, useState } from "react";
// utils
import { parseNumber } from "../utils/utils";
// services
import { useCreateProjectMutation } from "../services/projectsApi";
//components
import InputTimer from "../components/InputTimer";
import Input from "../components/Input";
import Alert, { AlertProps } from "../components/Alert";

// todo encaminhar para pagina de projetos
type AlertType = AlertProps["type"];

const CreateProject = () => {
  const [createProject] = useCreateProjectMutation();
  const [resetTimer, setResetTimer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("SUCCESS");
  const [alertMessage, setAlertMessage] = useState("");
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

  // handle click create new project
  async function handleClick() {
    const result = await createProject(formState);

    if (result?.data?.key?.length > 0) {
      setShowAlert(true);
      setAlertType("SUCCESS");
      setAlertMessage("Project: " + result.data.name + " created with success");
    } else {
      setShowAlert(true);
      setAlertType("ERROR");
      setAlertMessage("Error: project not created");
    }

    setFormState(resetState());
    setResetTimer(true);
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

  function closeAlert() {
    setShowAlert(false);
  }
  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Create Project Page </h1>
      </div>
      <Alert
        type={alertType}
        message={alertMessage}
        showAlert={showAlert}
        onCloseAlert={closeAlert}
      />
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
          onClick={handleClick}
          className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg"
        >
          Add Project
        </button>
      </div>
    </section>
  );
};

export default CreateProject;
