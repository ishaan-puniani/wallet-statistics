import React from "react";
import { getTheme } from "../../utilities/theme";

const theme = getTheme();
const ThemedSpan = ({ type, value, valueType = "string" }: any) => {
  return (
    <span
      style={
        theme[type] && theme[type][valueType]
          ? theme[type][valueType]
          : {}
      }
    >
      {theme[type] && theme[type][value] && theme[type][value]["icon"] && (
        <img {...theme[type][value]["icon"]}></img>
      )}
      <span
        style={
          theme[type] && theme[type][value] ? theme[type][value].labelStyle : {}
        }
      >
        {value}
      </span>
    </span>
  );
};
export default ThemedSpan;
