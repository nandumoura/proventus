// projectsServices.mjs
import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("Kanban");

import { createErrorLog } from "./errorLogsServices.mjs";

export const fetchKanbans = async () => {
  try {
    const kanbans = await db.fetch();
    kanbans.items.sort((a, b) => a.createdAt - b.createdAt);
    return kanbans.items;
  } catch (error) {
    await createErrorLog({
      name: "fetchKanbans",
      error,
    });
    console.error(error);
    throw error;
  }
};

export const fetchKanban = async (key) => {
  try {
    const kanban = await db.get(key);
    return kanban;
  } catch (error) {
    await createErrorLog({
      name: "fetchKanban",
      error,
    });
    console.error(error);
    throw error;
  }
};

export const createKanban = async (kanbanData) => {
  try {
    const kanban = {
      key: kanbanData.key,
      columns: kanbanData.columns,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdKanban = await db.put(kanban);
    return createdKanban;
  } catch (error) {
    await createErrorLog({
      name: "createKanban",
      error,
    });
    console.error(error);
    throw error;
  }
};

export const updateKanban = async (key, kanbanData) => {
  try {
    const { createdAt, ...updatedKanban } = kanbanData; // Remover a propriedade "createdAt" do objeto "kanbanData"
    updatedKanban.updatedAt = Date.now(); // Adicionar ou atualizar a propriedade "updatedAt"

    await db.update(updatedKanban, key);
    const newKanban = await db.get(key);
    return newKanban;
  } catch (error) {
    await createErrorLog({
      name: "updateKanban",
      error,
    });
    console.error(error);
    throw error;
  }
};

export const deleteKanban = async (key) => {
  try {
    await db.delete(key);
  } catch (error) {
    await createErrorLog({
      name: "deleteKanban",
      error,
    });
    console.error(error);
    throw error;
  }
};
