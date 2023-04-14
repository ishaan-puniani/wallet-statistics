import axios from "axios";
import { API_HOST } from "../../constants";
import { loadTheme } from "../../utilities/theme";

export const _initialize = async (credentials: any) => {
  const themeResponse = await axios.get(
    `${API_HOST}/tenant/${credentials.application_id}/settings`
  );
  if (themeResponse && themeResponse.data) {
    if (themeResponse.data.themeConfig) {
      loadTheme(themeResponse.data.themeConfig);
      return themeResponse.data.themeConfig;
    }
  }

  return undefined;
};
