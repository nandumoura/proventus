import { Kanban, Timer } from "../types/typings";

export const parseNumber = (value: string): number | string => {
  const parsedValue = Number(value);
  return isNaN(parsedValue) ? value : parsedValue;
};

export const calculateMilliseconds = (timer: Timer): number => {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30; // Suposição de 30 dias por mês

  const { seconds, minutes, hours, days, months } = timer;

  const totalMilliseconds =
    seconds * millisecondsPerSecond +
    minutes * millisecondsPerMinute +
    hours * millisecondsPerHour +
    days * millisecondsPerDay +
    months * millisecondsPerMonth;

  return totalMilliseconds;
};

export const convertToTimer = (milliseconds: number): Timer => {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30; // Suposição de 30 dias por mês

  const months = Math.floor(milliseconds / millisecondsPerMonth);
  const days = Math.floor(
    (milliseconds % millisecondsPerMonth) / millisecondsPerDay
  );
  const hours = Math.floor(
    (milliseconds % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (milliseconds % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (milliseconds % millisecondsPerMinute) / millisecondsPerSecond
  );

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const removeColumnById = (columnId: string, kanban: Kanban): Kanban => {
  const updatedColumns = kanban.columns.filter((column) => column.id !== columnId);
  const updatedKanban: Kanban = { ...kanban, columns: updatedColumns };
  return updatedKanban;
};