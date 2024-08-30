import axios from "axios";
import { getFilterQueryString } from "../../utilities/queryParams";
import { API_HOST } from "../../constants";

export const _userAchivements = async (
  credentials: any,
  filterMap: any,
  limit?: string,
  offset?: string
) => {
  const filterQuery = getFilterQueryString({ filter: filterMap });
  const limitValue = limit ? `&limit=${limit}` : `&`;
  const offsetValue = offset ? `&offset=${offset}` : `&`;

  const userAchivements = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/user-achievements/?${filterQuery}${limitValue}${offsetValue}`,
    {
      ...credentials,
    }
  );
  return userAchivements.data;
};
