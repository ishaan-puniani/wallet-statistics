import axios from "axios";
import { API_HOST } from "../../constants";

export const _fetchBalance = async (
  credentials: any,
  userId: string,
  currency: string
) => {
  const balanceResponse = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${userId}&filter[currency]=${currency}`,
    {
      ...credentials,
    }
  );
  return balanceResponse.data;
};

export const _fetchBalanceHistory = async (
  credentials: any,
  userId: string,
  currency: string,
  startDate: string,
  endDate: string
) => {
  const balnceHistory = await axios.post(
    // `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?dateRange[]='10-03-2023'`,
    `${API_HOST}/tenant/${credentials.application_id}/reports/get-partner-balances-report-by-date?filter[userId]=${userId}&filter[currency]=${currency}&filter[dateRange][]=${startDate}&filter[dateRange][]=${endDate}`,
    {
      ...credentials,
    }
  );
  return balnceHistory.data;
};
