import { lightBlue, teal } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

const defaultThemeOptions: ThemeOptions  = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: teal['A400'],
      light: teal['A400'],
      dark: teal['A400'],
      contrastText: '#fff',
    },
    success: {
      main: teal['A400'],
      light: teal['A400'],
      dark: teal['A400'],
      contrastText: '#fff',
    },
    secondary: {
      main: lightBlue['A200'],
      light: lightBlue['A200'],
      dark: lightBlue['A200'],
      contrastText: '#fff',
    },
    action: {
      disabled: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 200,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
        },
      },
    },
  },
}

export default defaultThemeOptions;