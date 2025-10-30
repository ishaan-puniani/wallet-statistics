import axios from "axios";
import { API_HOST, REPORTING_API_HOST } from "../../constants";
import { getFilterQueryString } from "../../utilities/queryParams";

export const _fetchBalance = async (
  credentials: any,
  userId: string,
  currency: string
) => {
  const balanceResponse = await axios.post(
    `${credentials.API_HOST || API_HOST}/tenant/${credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${userId}&filter[currency]=${currency}`,
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
    `${credentials.API_HOST || API_HOST}/tenant/${credentials.application_id}/reports/get-partner-balances-report-by-date?filter[userId]=${userId}&filter[currency]=${currency}&filter[dateRange][]=${startDate}&filter[dateRange][]=${endDate}`,
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
  includePrevious: boolean,
  includeToday: boolean
) => {
  const getbalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/getbalances?filter[PartnerId]=${userId}&filter[currency]=${currency}&filter[DateRange]=${startDate}&filter[DateRange]=${endDate}&group=${group}&includePrevious=${includePrevious}&includeToday=${includeToday}`,
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
  startDate: string,
  endDate: string,
  bookmark: boolean,
  flag: boolean
) => {
  const filterQuery = getFilterQueryString({ filter: filterMap });
  const bookmarked = bookmark ? `&bookmark=${bookmark}` : `&`;
  const flaged = flag ? `&flag=${flag}` : `&`;

  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/transactions/grouped/balances?${filterQuery}&filter[CreatedAtRange]=${startDate}&filter[CreatedAtRange]=${endDate}&OrderBy=${orderBy}${bookmarked}${flaged}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};

export const _fetchReportTransactions = async (
  credentials: any,
  filterMap: any,
  startDate?: string,
  endDate?: string,
  suspense?: boolean,
  limit?: string
) => {
  const filterQuery = getFilterQueryString({ filter: filterMap });
  const startingDate = startDate ? `&filter[CreatedAtRange]=${startDate}` : `&`;
  const endingDate = endDate ? `&filter[CreatedAtRange]=${endDate}` : `&`;
  const suspensed = suspense ? `&suspense=${suspense}` : `&`;
  const limitValue = limit ? `&Limit=${limit}` : `&`;

  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/transactions/?${filterQuery}${startingDate}${endingDate}${suspensed}${limitValue}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};

export const _fetchReportTransactionsCount = async (
  credentials: any,
  group: string
) => {
  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/transactions/grouped/count/?Group=${group}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};

export const _fetchReportUserAchievementsCount = async (
  credentials: any,
  group: string
) => {
  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/userachievements/grouped/count/?Group=${group}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};

export const _fetchReportUserAchievementsLogsCount = async (
  credentials: any,
  group: string
) => {
  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/userachievements/logs/grouped/count/?Group=${group}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};

export const _fetchReportPartnersCount = async (
  credentials: any,
  group: string
) => {
  const getGroupedBalances = await axios.post(
    `${credentials.REPORTING_API_HOST || REPORTING_API_HOST}/tenant/${credentials.application_id}/reports/partners/grouped/count/?Group=${group}`,
    {
      ...credentials,
    }
  );
  return getGroupedBalances.data;
};
