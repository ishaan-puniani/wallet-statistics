import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const THEME = {
  amount: {
    positive: {
      color: "red",
    },
    negative: {
      color: "green",
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
    MINING_FEES: {
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
