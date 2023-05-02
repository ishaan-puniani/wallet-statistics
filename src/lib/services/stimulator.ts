import axios from "axios";
import { API_HOST } from "../../constants";

export const stimulateTransaction = async (credentials: any, data: any) => {
  const stimulateTransaction = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/simulate-currency-transaction/`,
    {
      data,
    }
  );
  return stimulateTransaction.data;
};

export const stimulateMultiTransactions = async (credentials: any, data: any) => {
    const stimulateTransaction = await axios.post(
      `${API_HOST}/tenant/${credentials.application_id}/simulate-currency-transaction/multiple`,
      {
        data,
      }
    );
    return stimulateTransaction.data;
  };
