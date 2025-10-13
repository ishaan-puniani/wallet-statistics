import { credentials } from "../credentials";
const key_saveServiceAccountCredentials = "saveServiceAccountCredentials";
export const saveServiceAccountCredentials = (object: any) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(key_saveServiceAccountCredentials, JSON.stringify(object));
  }
};

export const getServiceAccountCredentials = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const val = localStorage.getItem(key_saveServiceAccountCredentials);
    if (val && val.length > 5) {
      return JSON.parse(val);
    }
  }
  return credentials;
};

export const clear = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
};
