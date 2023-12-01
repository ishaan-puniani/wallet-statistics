import { credentials } from "../credentials";
const key_saveServiceAccountCredentials = "saveServiceAccountCredentials";
export const saveServiceAccountCredentials = (object: any) => {
  localStorage.setItem(key_saveServiceAccountCredentials, JSON.stringify(object));
};

export const getServiceAccountCredentials = () => {
  const val = localStorage.getItem(key_saveServiceAccountCredentials);
  if (val && val.length > 5) {
    return JSON.parse(val);
  }
  return credentials;
};

export const clear = () => {
  localStorage.clear();
};
