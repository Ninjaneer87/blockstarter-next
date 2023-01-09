import { createContext, useContext } from "react";

export type ThemeContextType = { dark: boolean; toggleDarkMode: () => void };
const ThemeContext = createContext({});
export default ThemeContext;

export const useThemeContext = () => useContext(ThemeContext) as ThemeContextType;