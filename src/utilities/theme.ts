import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const THEME = {
  amount: {
    positive: { color: "green" },
    negative: {
      color: "red",
    },
  },
  currencies: {
    CUSDT: {
      icon: "",
      color: "green",
    },
    USD: {
      icon: "",
      color: "red",
    },
    COINS: {
      labelStyle: { color: "#fff", backgroundColor: "blue" },
    },
  },
  transactionTypes: {
    MINT: {
      chart: {
        color: "red",
      }
    },
    MINING_FEES: {
      chart: {
        color: "red",
      },
      icon: {
        src: "https://i.ibb.co/T4bQsPv/download.png",
        style: { width: "24px", height: "24px" },
      },
      iconStyle: { color: "#fff", backgroundColor: "green" },
      labelStyle: { color: "#fff", backgroundColor: "green" },
    },
  },
};

export const getTheme = () => {
  return THEME;
};

export const makeRandomColor = () =>
  "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
