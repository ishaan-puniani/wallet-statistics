import axios from "axios";
import { API_HOST } from "../../constants";
import { getTheme, loadTheme, resetTheme } from "../../utilities/theme";

export const _initialize = async (credentials: any, reset?: boolean) => {
  if(reset){
    resetTheme();
  }
  const cachedTheme = getTheme();
  if (!cachedTheme) {
    const themeResponse = await axios.get(
      `${credentials.host || API_HOST}/tenant/${credentials.application_id}/settings`
    );
    if (themeResponse && themeResponse.data) {
      if (themeResponse.data.themeConfig) {
        loadTheme(themeResponse.data.themeConfig);
        return themeResponse.data.themeConfig;
      }
    }
  }

  return undefined;
};
