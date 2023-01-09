import { ThemeOptions } from "@mui/material/styles";
import defaultThemeOptions from "./defaultThemeOptions";

const darkThemeOptions: ThemeOptions = {
  ...defaultThemeOptions,
  palette: {
    ...defaultThemeOptions.palette,
    background: {
      paper: "#2c2f32cc",
      default: "#1c1c24",
    },
    mode: "dark",
  },
};

export default darkThemeOptions;