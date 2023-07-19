import axios from "axios";
/* eslint-disable   @typescript-eslint/no-explicit-any */
export async function sendErrorLogs(name: string, error: any) {
  try {
    const dataToSend = {
      name,
      error,
    };
    const response = await axios.post("/api/error-logs", { data: dataToSend });
    return response;
  } catch (error) {
    console.error(error); // Trate erros, se houver algum
  }
}
