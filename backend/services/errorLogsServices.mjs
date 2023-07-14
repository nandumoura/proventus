import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("ErrorLogs");

// error deve possuir um name com o nome da função que chama o erro, um error com o objeto e a data da chamada

export const createErrorLog = async (name, error) => {
  try {
    const errorLog = {
      name,
      error,
      createdAt: Date.now(),
    };
    const createErrorLog = await db.put(errorLog);
    return createErrorLog;
  } catch (error) {
    console.error(error);
  }
};

//todo create a fetch function to get errors
