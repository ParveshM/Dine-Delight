export const setIteminLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getIteminLocalStorage = (key: string) => localStorage.getItem(key);
export const removeIteminLocalStorage = (key: string) =>
  localStorage.removeItem(key);
