import axios from "axios";
import { API_HOST, REPORTING_API_HOST } from "../../constants";
import { getFilterQueryString } from "../../utilities/queryParams";

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

export const _fetchGetBalances = async (
  credentials: any,
  userId: string,
  currency: string,
  startDate: string,
  endDate: string,
  group: string,
  includePrevious: boolean
) => {
  const getbalances = await axios.post(
    `${REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/getbalances?filter[PartnerId]=${userId}&filter[currency]=${currency}&filter[DateRange]=${startDate}&filter[DateRange]=${endDate}&group=${group}&includePrevious=${includePrevious}`,
    {
      ...credentials,
    }
  );
  return getbalances.data;
};

export const _fetchTransactionGroupedBalances = async (
  credentials: any,
  orderBy: string,
  filterMap: any,
  includeSubPartners?: boolean
) => {
  const filterQuery = getFilterQueryString({ filter: filterMap });
  const getGroupedBalances = await axios.post(
    `${REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/transactions/grouped/balances/?OrderBy=${orderBy}&IncludeSubPartners=${includeSubPartners}&${filterQuery}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};
