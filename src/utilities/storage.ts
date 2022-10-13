import { credentials } from "../credentials";
const key_saveMachineUserCredentials = "saveMachineUserCredentials";
export const saveMachineUserCredentials = (object: any) => {
  localStorage.setItem(key_saveMachineUserCredentials, JSON.stringify(object));
};

export const getMachineUserCredentials = () => {
  const val = localStorage.getItem(key_saveMachineUserCredentials);
  if (val && val.length > 5) {
    return JSON.parse(val);
  }
  return credentials;
};

export const clear = () => {
  localStorage.clear();
};
