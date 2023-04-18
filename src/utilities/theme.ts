const THEME_KEY = `wallet_theme`;
let THEME: any;

export const getTheme = () => {
  if (THEME) {
    return THEME;
  }
  const themeFromStorage = localStorage.getItem(THEME_KEY);
  if (themeFromStorage && themeFromStorage.length > 5) {
    THEME = JSON.parse(themeFromStorage);
  }
  return THEME;
};

export const loadTheme = async (themeConfig: any) => {
  localStorage.setItem(THEME_KEY, JSON.stringify(themeConfig));
};
export const resetTheme = async ()=>{
  localStorage.removeItem(THEME_KEY);
}
export const makeRandomColor = () =>
  "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
