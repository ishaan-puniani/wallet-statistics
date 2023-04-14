import axios from "axios";
import { API_HOST } from "../../constants";
import { getFilterQueryString } from "../../utilities/queryParams";

export const _fetchTransactions = async (
  credentials: any,
  limit: number,
  offset: number,
  filterMap: any
) => {
  const filterQuery = getFilterQueryString({ filter: filterMap });

  const transactions = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/get-transaction?limit=${limit}&offset=${offset}&${filterQuery}`,
    {
      ...credentials,
    }
  );

  return transactions.data;
};
