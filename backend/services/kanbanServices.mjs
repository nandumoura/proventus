// projectsServices.mjs
import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("Kanban");

export const fetchKanbans = async () => {
  try {
    const kanbans = await db.fetch();
    kanbans.items.sort((a, b) => a.createdAt - b.createdAt);
    return kanbans.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchKanban = async (key) => {
  try {
    const kanban = await db.get(key);
    return kanban;
  } catch (error) {
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
    console.error(error);
    throw error;
  }
};


export const deleteKanban = async (key) => {
  try {
    await db.delete(key);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
