import axios from "axios";
import { API_HOST } from "../../constants";

export const _fetchAchievementsLogs = async (
  transaction?: string,
  userAchievement?: string,
  credentials?: any
) => {
  const achievementLogs = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/get-user-achievement-logs?limit=10&offset=0&filter[transaction]=${transaction}&filter[userAchievement]=${userAchievement}`,
    {
      ...credentials,
    }
  );
  return achievementLogs.data;
};
