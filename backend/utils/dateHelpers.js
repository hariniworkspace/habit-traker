export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const isToday = (date) => {
  return date === getToday();
};