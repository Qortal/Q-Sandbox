"use client";
import React, { FC } from "react";
import { ThemeProvider } from "@emotion/react";

import {lightTheme, darkTheme} from "./styles/theme"
import {  useThemeStore } from "./atoms/global";
interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
