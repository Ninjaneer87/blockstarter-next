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
    text: {
      primary: 'rgba(0, 0, 0, .8)'
    }
  },
}

export default lightThemeOptions;