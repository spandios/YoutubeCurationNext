export const setStore = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getStore = (key: string) => {
  return localStorage.getItem(key);
};
