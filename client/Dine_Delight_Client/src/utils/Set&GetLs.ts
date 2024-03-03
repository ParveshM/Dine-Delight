export const setItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string) =>
  localStorage.getItem(key);
export const removeItemFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);
