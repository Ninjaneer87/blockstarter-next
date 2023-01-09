import { teal } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import defaultThemeOptions from './defaultThemeOptions';

const lightThemeOptions: ThemeOptions  = {
  ...defaultThemeOptions,
  palette: {
    ...defaultThemeOptions.palette,
    background: {
      paper: "#ffffffcc",
      default: "#f0f0f3",
    },
  },
}

export default lightThemeOptions;