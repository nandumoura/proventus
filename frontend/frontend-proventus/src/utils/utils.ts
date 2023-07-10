export const parseNumber = (value: string): number | string => {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? value : parsedValue;
  };