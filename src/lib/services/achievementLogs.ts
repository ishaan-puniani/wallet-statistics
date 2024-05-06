import axios from "axios";
import { API_HOST } from "../../constants";

export const _fetchAchievementsLogs = async (
  credentials?: any,
  transaction?: string,
  userAchievement?: string,
  limit?: any,
  offset?: any
) => {
  const achievementLogs = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/get-user-achievement-logs?limit=${limit}&offset=${offset}&filter[transaction]=${transaction}&filter[userAchievement]=${userAchievement}`,
    {
      ...credentials,
    }
  );
  return achievementLogs.data;
};

export const _fetchUserAchievementsLogs = async (
  credentials?: any,
  achieverId?: string
) => {
  const achievements = await axios.post(
    `${API_HOST}/tenant/${credentials.application_id}/user-achievements/get-active/${achieverId}`,
    {
      ...credentials,
    }
  );
  return achievements.data;
};